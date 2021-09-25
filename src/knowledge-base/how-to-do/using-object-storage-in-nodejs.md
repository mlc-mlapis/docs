# Using S3 compatible object storage in Node.js

You can find more examples and code samples written in Node.js / JavaScript that demonstrate how to interact with Amazon Simple Storage Service (Amazon S3) on the page [JavaScript Code Samples for Amazon S3](https://docs.aws.amazon.com/code-samples/latest/catalog/code-catalog-javascriptv3-example_code-s3.html).

## Installing the required SDKs

* Use [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com) as a dependency manager for Node.js. It's already globally pre-installed in each Zerops Node.js Service, and you can install it also in your local development environment.

* Use the `package.json` file with the preferable version of [AWS SDK for JavaScript](https://github.com/aws/aws-sdk-js) (current latest version is **v2.987.0**) and place it in the application code root directory.

```json
{
   "dependencies": {
      "aws-sdk": "2.987.0"
   }
}
```

* Suppose you run ==`npm install`== manually in your local development environment, the `package-lock.json` file is created beside the `package.json` file. If you run ==`yarn install`== , the `yarn.lock` is created instead.

* Place the line ==`npm install`== or ==`yarn install`== to the [run](/documentation/build/build-config.html#run) section of the [zerops.yml](/documentation/build/build-config.html) configuration file necessary for building your application.

```yaml
runs:
  - ...
  - npm install
  - ...
```

* The package manager downloads the necessary files and creates a new subdirectory `aws-sdk` in the `node_packages` directory placed beside the `package.json` file.

## How to get access credentials

Using the following code, you will get a variable ==`credentials`== containing an object used later for authentication when creating buckets and their content.

Assume further that the code is associated with access to the Zerops Object Storage Service, whose [object storage name](/documentation/services/storage/s3.html#object-storage-name) was chosen as the ==**`store`**== . The necessary [Storage access details](/documentation/services/storage/s3.html#from-local-environment) values **Access Key Id** and **Secret Access Key** are taken from the [environment variables](/documentation/environment-variables/how-to-access.html) then.

<!-- markdownlint-disable DOCSMD004 -->
::: info
The unique generated id of the created Zerops Object Storage Service instance is used as the value of the **accessKeyId** environment variable. The value of **secretAccessKey** is a 16-character-long random string.
:::
<!-- markdownlint-enable DOCSMD004 -->

```javascript
// Include the necessary AWS SDK modules.
const AWS = require('aws-sdk/global');
const S3Client = require('aws-sdk/clients/s3');

// Get the global environment object.
const env = process.env;

// Object storage name.
const objectStorageName = 'store';
// Necessary environment variable names.
const accessKeyId = 'accessKeyId';
const secretAccessKey = 'secretAccessKey';

// Get an object with credentials.
const credentials = new AWS.Credentials(
   env[`${objectStorageName}_${accessKeyId}`],
   env[`${objectStorageName}_${secretAccessKey}`]
);
```

## Creating a new object storage bucket

Once you get the `credentials` from the previous code snippet (supposing all declared variables are also accessible), you can create a named bucket as a container for storing objects. Remember, it's necessary that all created buckets in the entire Zerops have unique names. See the recommendation for the [bucket naming convention](/documentation/services/storage/s3.html#used-technology).

<!-- markdownlint-disable DOCSMD004 -->
::: info Asynchronous API calls
All API calls to the object storage service are asynchronous and that's why **async/await** pattern is used.
:::
<!-- markdownlint-enable DOCSMD004 -->

```javascript
// All bucket names in the Zerops shared object storage namespace have to be unique!
const uniqueBucketPrefix = env[`${objectStorageName}_${accessKeyId}`];
// Required bucket name.
const localBucketName = 'records';
const bucketName = `${uniqueBucketPrefix}:${localBucketName}`;
// Necessary environment variable name.
const apiUrl = 'apiUrl';
const apiUrlValue = env[`${objectStorageName}_${apiUrl}`];

// Function declaration.
const getS3Client = (apiUrlValue, credentials) => {
   // Create a new S3 SDK client instance.
   return new S3Client({
      version: 'latest',
      // Zerops supports only the S3 default region for API calls.
      // It doesn't mean that the physical HW infrastructure is located there also.
      // All Zerops infrastructure is completely located in Europe/Prague.
      region: 'us-east-1',
      endpoint: apiUrlValue,
      // Zerops supports currently only S3 path-style addressing model.
      // The virtual-hosted style model will be supported in near future.
      s3ForcePathStyle: true,
      credentials
   });
}

// Function declaration.
const listBuckets = async (s3Client) => {
   return await s3Client.listBuckets().promise();
}

// Function declaration.
const createBucket = async (s3Client, bucketName) => {
   // Create a new bucket.
   return await s3Client.createBucket({
      Bucket: bucketName,
      // It's required to declare even with no constraints.
      CreateBucketConfiguration: {
         LocationConstraint: ''
      }
   }).promise();
}

// Calling the function: getS3Client
const s3Client = getS3Client(apiUrlValue, credentials);

(async () => {
   // Calling the function: createBucket
   const result = await createBucket(s3Client, bucketName);
   // Calling the function: listBuckets
   const buckets = await listBuckets(s3Client);
})();
```

<!-- markdownlint-disable DOCSMD004 -->
::: info Created new bucket URL
As the S3 path-style addressing model is used, the bucket's effective URL is:

```url
https://s3.app.zerops.io/records
```

:::
<!-- markdownlint-enable DOCSMD004 -->

## Getting an existing object storage bucket ACL setting

Once you have the `credentials` and `getS3Client` function from the previous code snippet (supposing all declared variables are also accessible), you can check the existence of a bucket and get its ACL setting.

```javascript
// All bucket names in the Zerops shared object storage namespace have to be unique!
const uniqueBucketPrefix = env[`${objectStorageName}_${accessKeyId}`];
// Required bucket name.
const localBucketName = 'records';
const bucketName = `${uniqueBucketPrefix}:${localBucketName}`;

// Function declaration.
const getBucketAcl = async (s3Client, bucketName) => {
   // Check, if the required bucket exists.
   return await s3Client.headBucket({
      Bucket: bucketName
   }).promise().then(
      // If yes, return its ACL setting.
      () => {
         return (async () => {
            return await s3Client.getBucketAcl({
               Bucket: bucketName
            }).promise();
         })();
      },
      // If no, return 404 or 403 status code.
      error => {
         if (error.statusCode === 404) {
            console.log(`... bucket name <${bucketName}> not found`);
         } else {
            console.log(`... bucket name <${bucketName}> access denied`);
         }
         return error.statusCode;
      }
   );
}

// Calling the function: getS3Client
const s3Client = getS3Client(apiUrlValue, credentials);

(async () => {
   // Calling the function: getBucketAcl
   const result = await getBucketAcl(s3Client, bucketName);
})();
```

<!-- markdownlint-disable DOCSMD004 -->
::: info Default bucket's Grants setting
As mentioned in the documentation [Object storage owner identity](/documentation/services/storage/s3.html#object-storage-owner-identity), there is only the one grantee, equal to the owner, with the same name as the chosen [Object storage name](#object-storage-name) (for example, ==`store`== ).

```json
"Grants": [{
   "Grantee": {
      "DisplayName": "store",
      "ID": "zZ92GYuvR4yZF0KAjFaLzg",
      "Type": "CanonicalUser"
   },
   "Permission": "FULL_CONTROL"
}]
```

:::
<!-- markdownlint-enable DOCSMD004 -->

<!-- markdownlint-disable DOCSMD004 -->
::: info Default bucket's @metadata headers
It's also worth listing the default setting of a bucket's headers related to the HTTPS public read/write access (authenticated access is currently not available through RESTful interface):

```json
"@metadata": {
  "headers": {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization",
    "access-control-expose-headers": "Content-Length,Content-Range"
  }
}
```

The same default **@metadata headers** setting is also used for all added bucket's objects.

:::
<!-- markdownlint-enable DOCSMD004 -->

## Update an existing object storage bucket ACL

Once you have the `credentials` and `getS3Client` function from the previous code snippet (supposing all declared variables are also accessible), you can check the existence of a bucket and modify its ACL setting to one of [canned grants](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl).

```javascript
// All bucket names in the Zerops shared object storage namespace have to be unique!
const uniqueBucketPrefix = env[`${objectStorageName}_${accessKeyId}`];
// Required bucket name.
const localBucketName = 'records';
const bucketName = `${uniqueBucketPrefix}:${localBucketName}`;

// Function declaration.
const putBucketAcl = async (s3Client, bucketName, options) => {
   // Check, if the required bucket exists.
   return await s3Client.headBucket({
      Bucket: bucketName
   }).promise().then(
      // If yes, modify its ACL setting to public read.
      () => {
         return (async () => {
            return await s3Client.putBucketAcl(
               {
                  ...{Bucket: bucketName},
                  ...options
               }
            ).promise();
         })();
      },
      // If no, return 404 or 403 status code.
      error => {
         if (error.statusCode === 404) {
            console.log(`... bucket name <${bucketName}> not found`);
         } else {
            console.log(`... bucket name <${bucketName}> access denied`);
         }
         return error.statusCode;
      }
   );
}

// Calling the function: getS3Client
const s3Client = getS3Client(apiUrlValue, credentials);

(async () => {
   // Calling the function: putBucketAcl
   const result = await putBucketAcl(s3Client, bucketName, {ACL: 'public-read'});
})();
```

Setting the ACL as ==`public-read`== adds another `Grantee` to the bucket's `Grants` list:

```json
{
   "Grantee": {
      "Type": "Group",
      "URI": "http://acs.amazonaws.com/groups/global/AllUsers"
   },
   "Permission": "READ"
}
```

If you have another Zerops Object Storage Service in your project (for example, the one with ==`archivestore`== [Object Storage Name](/documentation/services/storage/s3.html#object-storage-bucket-names)), you can set its bucket access rights to allow access from the ==`store`== service with [read](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#permissions) access.

<!-- markdownlint-disable DOCSMD004 -->
::: warning Grants work in overwriting mode
Setting ==`AccessControlPolicy`== requires defining the ==`Grants`== property with the complete list of items ( ==`Grantee`== ) and also the ==`Owner`== property for the bucket because it overwrites the previous value. It doesn't work in an incremental mode. You will probably create a more sophisticated routine to prepare the **access control policy** you need. Here, it's simplified to the simple calculated value.
:::
<!-- markdownlint-enable DOCSMD004 -->

```javascript
// Object storage name.
const archiveObjectStorageName = 'archivestore';
// Get an object with credentials.
const archiveCredentials = new AWS.Credentials(
   env[`${archiveObjectStorageName}_${accessKeyId}`],
   env[`${archiveObjectStorageName}_${secretAccessKey}`]
);
// All bucket names in the Zerops shared object storage namespace have to be unique!
const archiveUniqueBucketPrefix = env[`${archiveObjectStorageName}_${accessKeyId}`];
// Required bucket name.
const archiveLocalBucketName = 'records';
const archiveBucketName = `${archiveUniqueBucketPrefix}:${archiveLocalBucketName}`;

// Definition of required grantees
const accessControlPolicy: {
   Grants: [
      {
         Grantee: {
            DisplayName: archiveObjectStorageName,
            ID: env[`${archiveObjectStorageName}_${accessKeyId}`],
            Type: 'CanonicalUser'
         },
         Permission: 'FULL_CONTROL'
      },
      {
         Grantee: {
            DisplayName: objectStorageName,
            ID: env[`${objectStorageName}_${accessKeyId}`],
            Type: 'CanonicalUser'
         },
         Permission: 'READ'
      }
   ],
   Owner: {
      DisplayName: archiveObjectStorageName,
      ID: env[`${archiveObjectStorageName}_${accessKeyId}`]
   }
};

// Calling the function: getS3Client
const s3Client = getS3Client(apiUrlValue, archiveCredentials);

(async () => {
   // Calling the function: putBucketAcl
   const result = await putBucketAcl(s3Client, archiveBucketName, {AccessControlPolicy: accessControlPolicy});
})();
```

## Adding a new bucket's object (with body or a file)

When having `credentials` from the previous code snippet (supposing all declared variables are also accessible), you can put a new object inside a bucket. You have to have WRITE permissions on a bucket to add an object to it.

```javascript
// All bucket names in the Zerops shared object storage namespace have to be unique!
const uniqueBucketPrefix = env[`${objectStorageName}_${accessKeyId}`];
// Required bucket name.
const localBucketName = 'records';
const bucketName = `${uniqueBucketPrefix}:${localBucketName}`;

// Declaration of an object with a body to be placed into a bucket.
const objectKey = "K1.txt";
const objectBody = "Description of the K1.";

// Declaration of an object with a file to be placed into a bucket.
const objectFileKey = "scan_20210815_00001.jpg";
const path = require('path');
const filePath = path.join(__dirname, `/files/${objectFileKey}`);
const fs = require('fs');
const readFileStream = fs.createReadStream(filePath);

// Function declaration.
const putObject = async (s3Client, bucketName, objectKey, objectContent) => {
   // Checking, if the required bucket exists or not is the same as in previous examples.
   // If the object's key already exist, it'll be overwritten.
   return await s3Client.putObject({
      Bucket: bucketName,
      Key: objectKey,
      Body: objectContent
   }).promise();
}

// Calling the function: getS3Client
const s3Client = getS3Client(apiUrlValue, credentials);

(async () => {
   // Calling the function: putObject
   const resultBody = await putObject(s3Client, bucketName, objectKey, objectBody);
   const resultFile = await putObject(s3Client, bucketName, objectFileKey, readFileStream);
})();
```

## Getting an existing bucket's object (with body or a file)

When you have the `credentials` from the previous code snippet (supposing all declared variables are also accessible), you can get an already existing object from a bucket back. You have to at least have READ permissions on a bucket to get an object from it.

```javascript
// All bucket names in the Zerops shared object storage namespace have to be unique!
const uniqueBucketPrefix = env[`${objectStorageName}_${accessKeyId}`];
// Required bucket name.
const localBucketName = 'records';
const bucketName = `${uniqueBucketPrefix}:${localBucketName}`;

// Declarations of the object's keys whose body contents are to be retrieved from the bucket.
const objectKey = "K1.txt";
const objectFileKey = "scan_20210815_00001.jpg";

const path = require('path');
const filePath = path.join(__dirname, `/files/${objectFileKey}`);
const fs = require('fs');
const writeFileStream = fs.createWriteStream(filePath);

// Function declaration.
const getObject = async (s3Client, bucketName, objectKey) => {
   // Checking, if the required bucket exists or not is the same as in previous examples.
   // Check, if the required object's key exists.
   return await s3Client.headObject({
      Bucket: bucketName,
      Key: objectKey
   }).promise().then(
      // If yes, retrieve its body.
      () => {
         return (async () => {
            return await s3Client.getObject({
                  Bucket: bucketName,
                  Key: objectKey
            }).promise();
         })();
      },
      // If no, return 404 or 403 status code.
      error => {
         if (error.statusCode === 404) {
            console.log(`... object key <${objectKey}> not found`);
         } else {
            console.log(`... object key <${objectKey}> access denied`);
         }
         return error.statusCode;
      }
   );
}

// Calling the function: getS3Client
const s3Client = getS3Client(apiUrlValue, credentials);

(async () => {
   // Calling the function: getObject
   const resultBody = await getObject(s3Client, bucketName, objectKey);
   // Getting the body content from the response.
   const bodyContent = resultBody.Body.toString('utf-8');
   // Calling the function: getObject
   const resultFile = await getObject(s3Client, bucketName, objectFileKey);
   // Saving the received body content into a file.
   writeFileStream.write(resultFile.Body);
})();
```
