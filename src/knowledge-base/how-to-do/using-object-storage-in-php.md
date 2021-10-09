# Using S3 Compatible Object Storage in PHP

You can find more examples and code samples written in PHP that demonstrate how to interact with Amazon Simple Storage Service (Amazon S3) on the page [PHP Code Samples for Amazon S3](https://docs.aws.amazon.com/code-samples/latest/catalog/code-catalog-php-example_code-s3.html).

## Installing the required SDKs

* Use [Composer](https://getcomposer.org) as a dependency manager for PHP. It's already globally pre-installed in each Zerops PHP Service, and you can install it also in your local development environment.

* Create the `composer.json` file with the preferable version of [AWS SDK for PHP](https://aws.amazon.com/sdk-for-php) (current latest version is **v3.188**) and place it in the application code root directory.

```json
{
   "require": {
      "aws/aws-sdk-php": "3.188"
   }
}
```

* Suppose you run ==`composer install`== manually in your local development environment, the `composer.lock` file is created beside the `composer.json` file.

* Place the line ==`composer install`== to the [run](/documentation/build/build-config.html#run) section of the [zerops.yml](/documentation/build/build-config.html) configuration file necessary for building your application.

```yaml
runs:
  - ...
  - composer install
  - ...
```

* The composer install process downloads the necessary files and creates a new subdirectory `aws\aws-sdk-php` in the `vendor` directory placed directly in the application code root.

<!-- markdownlint-disable DOCSMD004 -->
::: info Where the following code snippets are used
Suppose the code is used in a `php` file located in a [document root](/documentation/services/runtimes/php.html#setting-php-apache-document-root) subdirectory (for example, ==**`public`**== ) placed directly in the [application code root](/documentation/services/runtimes/php.html#application-code-root-and-document-root).
:::
<!-- markdownlint-enable DOCSMD004 -->

## How to get access credentials

Using the following code, you will get a variable ==`$storeCredentials`== containing an object used later for authentication when creating buckets and their content.

Assume further that the code is associated with access to the Zerops Object Storage Service, whose [object storage name](/documentation/services/storage/s3.html#object-storage-name) was chosen as the ==**`store`**== . The necessary [Storage access details](/documentation/services/storage/s3.html#from-local-environment) values **Access Key Id** and **Secret Access Key** are taken from the [environment variables](/documentation/environment-variables/how-to-access.html) then.

<!-- markdownlint-disable DOCSMD004 -->
::: info
The unique generated id of the created Zerops Object Storage Service instance is used as the value of the **accessKeyId** environment variable. The value of **secretAccessKey** is a 16-character-long random string.
:::
<!-- markdownlint-enable DOCSMD004 -->

```php
<?php
  // Include the SDK using the Composer auto-loader.
  require '../vendor/autoload.php';

  // Import relevant SDK classes.
  use Aws\S3\S3Client;
  use Aws\S3\Exception\S3Exception;
  use Aws\Credentials\Credentials;

  try {
    // Object storage name.
    $storeObjectStorageName = 'store';
    // Necessary environment variable names.
    $accessKeyId = 'accessKeyId';
    $secretAccessKey = 'secretAccessKey';
    // Get an object with credentials.
    $storeCredentials = new Credentials(
      getenv("${storeObjectStorageName}_${accessKeyId}"),
      getenv("${storeObjectStorageName}_${secretAccessKey}")
    );
  } catch (S3Exception $e) {
    echo 'Error: ' . $e->getCode() . ':' . $e->getMessage();
  }
?>
```

## Creating a new object storage bucket

Once you get the `$storeCredentials` from the previous code snippet (supposing all declared variables are also accessible), you can create a named bucket as a container for storing objects. Remember, it's necessary that all created buckets in the entire Zerops have unique names. See our recommendation for the [bucket naming convention](/documentation/services/storage/s3.html#used-technology).

```php
<?php
  // All bucket names in the Zerops shared object storage namespace have to be unique!
  $uniqueBucketPrefix = getenv("${storeObjectStorageName}_${accessKeyId}");
  // Required bucket name.
  $localBucketName = 'records';
  $bucketName = "${uniqueBucketPrefix}.${localBucketName}";
  // Necessary environment variable name.
  $apiUrl = 'apiUrl';
  $apiUrlValue = getenv("${storeObjectStorageName}_${apiUrl}");

  // Function declaration: Getting an S3 SDK client
  function getS3Client($apiUrlValue, $storeCredentials) {
    // Create a new S3 SDK client instance.
    return new S3Client([
      // The 'version' is a required property in PHP SDK.
      'version' => 'latest',
      // Zerops supports only the S3 default region for API calls.
      // It doesn't mean that the physical HW infrastructure is located there also.
      // All Zerops infrastructure is completely located in Europe/Prague.
      'region' => 'us-east-1',
      'endpoint' => $apiUrlValue,
      // Zerops supports currently only S3 path-style addressing model.
      // The virtual-hosted style model will be supported in near future.
      'use_path_style_endpoint' => true,
      'credentials' => $storeCredentials
    ]);
  }

  // Function declaration.
  function createBucket($s3Client, $bucketName) {
    // Create a new bucket.
    return $s3Client->createBucket([
      'Bucket' => $bucketName
    ]);
  }

  // Calling the function: getS3Client
  $s3Client = getS3Client($apiUrlValue, $storeCredentials);
  // Calling the function: createBucket
  $bucket = createBucket($s3Client, $bucketName);
?>
```

<!-- markdownlint-disable DOCSMD004 -->
::: info Creating new bucket URL
As the S3 path-style addressing model is used, the bucket's effective URL is:

```url
https://s3.app.zerops.io/records
```

:::
<!-- markdownlint-enable DOCSMD004 -->

## Getting an existing object storage bucket ACL setting

When having `$storeCredentials` and `getS3Client` function from the previous code snippet (supposing all declared variables are also accessible), you can check the existence of a bucket and get its ACL setting.

```php
<?php
  // All bucket names in the Zerops shared object storage namespace have to be unique!
  $uniqueBucketPrefix = getenv("${storeObjectStorageName}_${accessKeyId}");
  // Required bucket name.
  $localBucketName = 'records';
  $bucketName = "${uniqueBucketPrefix}.${localBucketName}";

  // Function declaration.
  function getBucketAcl($s3Client, $bucketName) {
    // Check, if the required bucket exists.
    if ($s3Client->doesBucketExist($bucketName)) {
      // If yes, return its ACL setting.
      return $s3Client->getBucketAcl([
        'Bucket' => $bucketName
      ]);
    }
    // If the bucket doesn't exist, return null.
    return null;
  }

  // Calling the function: getS3Client
  $s3Client = getS3Client($apiUrlValue, $storeCredentials);
  // Calling the function: getBucketAcl
  $bucketAcl = getBucketAcl($s3Client, $bucketName);
?>
```

<!-- markdownlint-disable DOCSMD004 -->
::: info Default bucket's Grants setting
As mentioned in the documentation [Object storage owner identity](/documentation/services/storage/s3.html#object-storage-owner-identity), there is only the one grantee, equal to the owner, with the same name as the chosen [Object storage name](#object-storage-name) (for example, ==`store`== ).

```php
[
  "Grants" => [
    [
      "Grantee" => [
        "DisplayName" => "store",
        "ID" => "0lw7enbut8ykmmecyf3dzq",
        "Type" => "CanonicalUser"
      ],
      "Permission" => "FULL_CONTROL"
    ]
  ]
]
```

:::
<!-- markdownlint-enable DOCSMD004 -->

<!-- markdownlint-disable DOCSMD004 -->
::: info Default bucket's @metadata headers
It's also worth listing the default setting of a bucket's headers related to the HTTPS public read/write access (authenticated access is currently not available through RESTful interface):

```php
[
  "@metadata" => [
    "headers" => [
      "access-control-allow-origin" => "*",
      "access-control-allow-methods" => "GET, POST, PUT, DELETE, OPTIONS",
      "access-control-allow-headers" => "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization",
      "access-control-expose-headers" => "Content-Length,Content-Range"
    ]
  ]
]
```

The same default **@metadata headers** setting is also used for all added bucket's objects.

:::
<!-- markdownlint-enable DOCSMD004 -->

## Updating an existing object storage bucket ACL

Once you have the `$storeCredentials` and `getS3Client` function from the previous code snippet (supposing all declared variables are also accessible), you can check the existence of a bucket and modify its ACL setting to one of [canned grants](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl).

```php
<?php
  // All bucket names in the Zerops shared object storage namespace have to be unique!
  $uniqueBucketPrefix = getenv("${storeObjectStorageName}_${accessKeyId}");
  // Required bucket name.
  $localBucketName = 'records';
  $bucketName = "${uniqueBucketPrefix}.${localBucketName}";

  // Function declaration.
  function putPublicBucketAcl($s3Client, $bucketName) {
    // Check, if the required bucket exists.
    if ($s3Client->doesBucketExist($bucketName)) {
      // If yes, modify its ACL setting to public read.
      return $s3Client->putBucketAcl([
        'Bucket' => $bucketName,
        'ACL' => 'public-read'
      ]);
    }
    // If the bucket doesn't exist, return null.
    return null;
  }

  // Calling the function: getS3Client
  $s3Client = getS3Client($apiUrlValue, $storeCredentials);
  // Calling the function: putPublicBucketAcl
  putPublicBucketAcl($s3Client, $bucketName);
?>
```

Setting the ACL as ==`public-read`== adds another `Grantee` to the bucket's `Grants` list:

```php
[
  "Grantee" => [
    "Type" => "Group",
    "URI" => "http://acs.amazonaws.com/groups/global/AllUsers"
  ],
  "Permission" => "READ"
]
```

<!-- markdownlint-disable DOCSMD004 -->
::: info Public read access to a bucket
After setting the ACL as ==`public-read`== means that the URL `https://s3.app.zerops.io/records` will be accessible with the read access to anyone.
:::
<!-- markdownlint-enable DOCSMD004 -->

If you have another Zerops Object Storage Service in your project (for example, the one with ==`archive`== [Object Storage Name](/documentation/services/storage/s3.html#object-storage-bucket-names)), you can set its bucket access rights to allow access from the ==`store`== service with [read](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#permissions) access.

<!-- markdownlint-disable DOCSMD004 -->
::: warning Grants work in overwriting mode
Setting ==`AccessControlPolicy`== requires defining the ==`Grants`== property with the complete list of items ( ==`Grantee`== ) and also the ==`Owner`= property for the bucket because it overwrites the previous value. It doesn't work in an incremental mode. You will probably create a more sophisticated routine to prepare the **access control policy** you need. Here, it's simplified to the simple calculated value.
:::
<!-- markdownlint-enable DOCSMD004 -->

```php
<?php
  // Object storage name.
  $archiveObjectStorageName = 'archive';
  // Get an object with credentials.
  $archiveCredentials = new Credentials(
    getenv("${archiveObjectStorageName}_${accessKeyId}"),
    getenv("${archiveObjectStorageName}_${secretAccessKey}")
  );
  // All bucket names in the Zerops shared object storage namespace have to be unique!
  $archiveUniqueBucketPrefix = getenv("${archiveObjectStorageName}_${accessKeyId}");
  // Required bucket name.
  $archiveLocalBucketName = 'records';
  $archiveBucketName = "${archiveUniqueBucketPrefix}.${archiveLocalBucketName}";

  // Definition of required grantees
  $accessControlPolicy = [
    'Grants' => [
      [
        'Grantee' => [
          'DisplayName' => $archiveObjectStorageName,
          'ID' => getenv("${archiveObjectStorageName}_${accessKeyId}"),
          'Type' => 'CanonicalUser'
         ],
         'Permission' => 'FULL_CONTROL'
      ],
      [
        'Grantee' => [
          'DisplayName' => $storeObjectStorageName,
          'ID' => getenv("${storeObjectStorageName}_${accessKeyId}"),
          'Type' => 'CanonicalUser'
        ],
        'Permission' => 'READ'
      ]
    ],
    'Owner' => [
       'DisplayName' => $archiveObjectStorageName,
       'ID' => getenv("${archiveObjectStorageName}_${accessKeyId}")
    ]
  ];

  // Function declaration.
  function putCustomBucketAcl($s3Client, $bucketName, $accessControlPolicy) {
    // Check, if the required bucket exists.
    if ($s3Client->doesBucketExist($bucketName)) {
      // If yes, modify its AccessControlPolicy setting.
      return $s3Client->putBucketAcl([
        'Bucket' => $bucketName,
        'AccessControlPolicy' => $accessControlPolicy
      ]);
    }
    // If the bucket doesn't exist, return null.
    return null;
  }

  // Calling the function: getS3Client
  $s3Client = getS3Client($apiUrlValue, $archiveCredentials);
  // Calling the function: putCustomBucketAcl
  putCustomBucketAcl($s3Client, $archiveBucketName, $accessControlPolicy);
?>
```

<!-- markdownlint-disable DOCSMD004 -->
::: warning Cross-account access enabled buckets
If the ACL of buckets ACL are modified to allow access from another account as shown above (read access to buckets of `archive` object storage service using the credentials of `store` object storage service), it's necessary to understand that these are not implicitly listed among all available buckets of `store` object storage service (for example, using `$s3Client->listBuckets()`). They are called **external buckets**.
:::
<!-- markdownlint-enable DOCSMD004 -->

## Adding a new bucket's object (with body or a file)

When having `$storeCredentials` from the previous code snippet (supposing all declared variables are also accessible), you can put a new object inside a bucket. You have to have WRITE permissions on a bucket to add an object to it.

```php
<?php
  // All bucket names in the Zerops shared object storage namespace have to be unique!
  $uniqueBucketPrefix = getenv("${storeObjectStorageName}_${accessKeyId}");
  // Required bucket name.
  $localBucketName = 'records';
  $bucketName = "${uniqueBucketPrefix}.${localBucketName}";

  // Declaration of an object with a body to be placed into a bucket.
  $objectBodyKey = "K1.txt";
  $objectBody = "Description of the K1.";

  // Declaration of an object with a file to be placed into a bucket.
  $objectFileKey = "scan_20210815_00001.jpg";
  $filePath = "./files/" . $objectFileKey;


  // Function declaration.
  function putObjectWithBody($s3Client, $bucketName, $objectBodyKey, $objectBody) {
    // Check, if the required bucket exists.
    if ($s3Client->doesBucketExist($bucketName)) {
      // If yes, put an object inside the bucket.
      return $s3Client->putObject([
        'Bucket' => $bucketName,
        'Key' => $objectBodyKey,
        'Body' => $objectBody
      ]);
    }
    // If the bucket doesn't exist, return null.
    return null;
  }

  // Function declaration.
  function putObjectWithFile($s3Client, $bucketName, $objectFileKey, $filePath) {
    // Check, if the required bucket exists.
    if ($s3Client->doesBucketExist($bucketName)) {
      // If yes, put an object inside the bucket.
      return $s3Client->putObject([
        'Bucket' => $bucketName,
        'Key' => $objectFileKey,
        'SourceFile' => $filePath
      ]);
    }
    // If the bucket doesn't exist, return null.
    return null;
  }

  // Calling the function: getS3Client
  $s3Client = getS3Client($apiUrlValue, $storeCredentials);
  // Calling the function: putObjectBody
  $resultBody = putObjectWithBody($s3Client, $bucketName, $objectBodyKey, $objectBody);
  // Calling the function: putObjectFile
  $resultFile = putObjectWithFile($s3Client, $bucketName, $objectFileKey, $filePath);
?>
```

## Getting an existing bucket's object (with body or a file)

When you have the `$storeCredentials` from the previous code snippet (supposing all declared variables are also accessible), you can get an already existing object from a bucket back. You have to at least have READ permissions on a bucket to get an object from it.

```php
<?php
  // All bucket names in the Zerops shared object storage namespace have to be unique!
  $uniqueBucketPrefix = getenv("${storeObjectStorageName}_${accessKeyId}");
  // Required bucket name.
  $localBucketName = 'records';
  $bucketName = "${uniqueBucketPrefix}.${localBucketName}";

  // Declarations of the object's keys whose body contents are to be retrieved from the bucket.
  $objectBodyKey = "K1.txt";
  $objectFileKey = "scan_20210815_00001.jpg";

  $filePath = "./files/" . $objectFileKey;

  // Function declaration.
  function getObjectWithBody($s3Client, $bucketName, $objectBodyKey) {
    // Check, if the required bucket exists.
    if ($s3Client->doesBucketExist($bucketName)) {
      // Check, if the required object exists.
      if ($s3Client->doesObjectExist($bucketName, $objectBodyKey)) {
        // If yes, get an object from the bucket.
        return $s3Client->getObject([
          'Bucket' => $bucketName,
          'Key' => $objectBodyKey
        ]);
      }
    }
    // If either a bucket or an object doesn't exist, return null.
    return null;
  }

  // Function declaration.
  function getObjectWithFile($s3Client, $bucketName, $objectFileKey, $filePath) {
    // Check, if the required bucket exists.
    if ($s3Client->doesBucketExist($bucketName)) {
      // Check, if the required object exists.
      if ($s3Client->doesObjectExist($bucketName, $objectFileKey)) {
        // If yes, get an object from the bucket.
        return $s3Client->getObject([
          'Bucket' => $bucketName,
          'Key' => $objectFileKey,
          'SaveAs' => $filePath
        ]);
      }
    }
    // If either a bucket or an object doesn't exist, return null.
    return null;
  }

  // Calling the function: getS3Client
  $s3Client = getS3Client($apiUrlValue, $storeCredentials);

  // Calling the function to get an object body: getObjectBody
  $resultBody = getObjectWithBody($s3Client, $bucketName, $objectBodyKey);
  // Get the object body content.
  $bodyContent = $resultBody->get('Body')->getContents();

  // Calling the function to download an object file: getObjectFile
  $resultFile = getObjectWithFile($s3Client, $bucketName, $objectFileKey, $filePath);
  // The downloaded file will be saved on disk as declared by the $filePath.
?>
```
