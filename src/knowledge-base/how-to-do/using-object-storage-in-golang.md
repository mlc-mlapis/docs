# Using S3 compatible object storage in Golang

You can find more examples and code samples written in Golang that demonstrate how to interact with Amazon Simple Storage Service (Amazon S3) on the page [Golang Code Samples for Amazon S3](https://aws.github.io/aws-sdk-go-v2/docs/code-examples/s3).

## Installing the required SDKs

* The AWS SDK for Go V2 uses Go Modules, which was a feature introduced in Go 1.11. If you didn't initialize your GitHub/GitLab project as a Go module yet, for example, run the command ==`go mod init github.com/<user>/<repository>`== . It writes a new `go.mod` file in the current root project directory to track your code's dependencies. The `go.mod` file must not already exist. If you were to publish this module, it must be a path from which Go tools can download it.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Application code is located in a subdirectory
If your module code is not directly placed in the project root, but in its subdirectory, like the `app`, importing this module from other modules would be:

```go
import {
  "github.com/<user>/<repository>/app"
}
```

:::
<!-- markdownlint-enable DOCSMD004 -->

* To retrieve the core SDK Go V2 module, the config module which is used for loading the AWS configuration, and the AWS S3 service API client, run the commands:

```shell
go get github.com/aws/aws-sdk-go-v2
go get github.com/aws/aws-sdk-go-v2/config
go get github.com/aws/aws-sdk-go-v2/service/s3
```

* Both the Go commands, used later for running the application, `go run` locally, or compiling the [final binary executable](/documentation/services/runtimes/golang.html#start-command) `go build`, can download these dependency modules when needed.

## How to get access credentials

Using the following code, you will get a variable ==`credentials`== containing an object used later for authentication when creating buckets and their content.

Assume further that the code is associated with access to the Zerops Object Storage Service, whose [object storage name](/documentation/services/storage/s3.html#object-storage-name) was chosen as the ==**`store`**== . The necessary [Storage access details](/documentation/services/storage/s3.html#from-local-environment) values **Access Key Id** and **Secret Access Key** are taken from the [environment variables](/documentation/environment-variables/how-to-access.html) then.

<!-- markdownlint-disable DOCSMD004 -->
::: info
The unique generated id of the created Zerops Object Storage Service instance is used as the value of the **accessKeyId** environment variable. The value of **secretAccessKey** is a 16-character-long random string.
:::
<!-- markdownlint-enable DOCSMD004 -->

```go
// Include the necessary AWS SDK modules.
import (
  "os"
  "github.com/aws/aws-sdk-go-v2/credentials"
)

// Object storage name.
const objectStorageName = "store"

// Function returning a pointer to a variable with a user credentials.
func getCredentials(objectStorageName string) *credentials.StaticCredentialsProvider {
  // Necessary environment variable names.
  const accessKeyId = "accessKeyId"
  const secretAccessKey = "secretAccessKey"

  // Retrieving environment variable values.
  accessKeyIdValue, accessKeyIdFound := os.LookupEnv(objectStorageName + "_" + accessKeyId)
  secretAccessKeyValue, secretAccessKeyFound := os.LookupEnv(objectStorageName + "_" + secretAccessKey)
  // If both environment variables have been found ...
  if accessKeyIdFound && secretAccessKeyFound {
    credentials := credentials.NewStaticCredentialsProvider(accessKeyIdValue, secretAccessKeyValue, "")
    // A pointer to a variable with credentials is returned.
    return &credentials
  }
  // If any environment variable not found, return only the nil (it's compatible with a pointer).
  return nil
}
```

## How to get an S3 API client

Once you get the `getCredentials` function from the previous code snippet (supposing all declared variables are also accessible), you can create an S3 SDK client to access the S3 API.

```go
// Include the necessary AWS SDK modules.
import (
  "context"
  "errors"
  "os"
  "github.com/aws/aws-sdk-go-v2/config"
  "github.com/aws/aws-sdk-go-v2/credentials"
  "github.com/aws/aws-sdk-go-v2/service/s3"
)

/**
 * The way that allows you to pass in a <context> to your program. It should only be used at a high level
 * (in the main or top-level request handler). This can be used to derive other contexts. Here, it's only
 * a formal API requirement and not used in any way.
 */
var ctx = context.Background()

// Function declaration: Getting an S3 SDK client
func getS3Client(
  ctx context.Context,
  objectStorageName string,
  credentials *credentials.StaticCredentialsProvider
) (*s3.Client, error) {
  // Necessary environment variable name.
  const apiUrl = "apiUrl"
  // Getting the environment variable value.
  apiUrlValue, apiUrlFound := os.LookupEnv(objectStorageName + "_" + apiUrl)
  if !apiUrlFound {
    return nil, errors.New("non-existed apiUrl environment variable")
  }

  // Obtaining the S3 SDK client configuration based on the passed parameters.
  cnf, err := config.LoadDefaultConfig(
    ctx,
    config.WithCredentialsProvider(credentials),
    // Zerops supports only the S3 default region for API calls.
    // It doesn't mean that the physical HW infrastructure is located there also.
    // All Zerops infrastructure is completely located in Europe/Prague.
    config.WithRegion("us-east-1"),
  )
  if err != nil {
    return nil, err
  }

  // Create a new S3 SDK client instance.
  s3Client := s3.NewFromConfig(
    // Passing the S3 SDK client configuration created before.
    cnf,
    s3.WithEndpointResolver(
      // Applying of the Zerops Object Storage API URL endpoint.
      s3.EndpointResolverFromURL(apiUrlValue),
    ),
    func(opts *s3.Options) {
      // Zerops supports currently only S3 path-style addressing model.
      // The virtual-hosted style model will be supported in near future.
      opts.UsePathStyle = true
    },
  )
  if s3Client != nil {
    return s3Client, nil
  }
  return nil, errors.New("creating an S3 SDK client failed")
}
```

## Creating a new object storage bucket

Once you get the `getCredentials` and `getS3Client` functions from the previous code snippet (supposing all declared variables are also accessible), you can create a named bucket as a container for storing objects. Remember, it's necessary that all created buckets in the entire Zerops have unique names. See the recommendation for the [bucket naming convention](/documentation/services/storage/s3.html#used-technology).

```go
// Include the necessary AWS SDK modules.
import {
  "fmt"
  "os"
  "github.com/aws/aws-sdk-go-v2/aws"
  "github.com/aws/aws-sdk-go-v2/service/s3"
}

// Required bucket name.
const localBucketName = "records";

// Function declaration: Getting an S3 SDK client
func createBucket(
  ctx context.Context,
  objectStorageName string,
  s3Client *s3.Client,
  localBucketName string,
) (*s3.CreateBucketOutput, error) {
  // Necessary environment variable names.
  const accessKeyId = "accessKeyId"
  // All bucket names in the Zerops shared object storage namespace have to be unique!
  // Getting the environment variable value that will be used as the unique prefix.
  uniqueBucketPrefixValue, uniqueBucketPrefixFound := os.LookupEnv(objectStorageName + "_" + accessKeyId)
  if !uniqueBucketPrefixFound {
    return nil, errors.New("non-existed accessKeyId environment variable")
  }
  // Unique bucket name preparation.
  bucketName := uniqueBucketPrefixValue + "." + localBucketName;

  // Invoking the S3 SDK client method to create a new bucket.
  result, err := s3Client.CreateBucket(ctx, &s3.CreateBucketInput{
    Bucket: aws.String(bucketName),
  })
  if err != nil {
    return nil, err
  }
  return result, nil
}

// Function declaration: Getting information about existed buckets
func listBuckets(ctx context.Context, s3Client *s3.Client) (*s3.ListBucketsOutput, error) {
  // Invoking the S3 SDK client method to get a list of existed buckets.
  result, err := s3Client.ListBuckets(ctx, nil)
  if err != nil {
    return nil, err
  }
  return result, nil
}

// Calling the function: getCredentials
userCredentials := getCredentials(objectStorageName)
if userCredentials != nil {
  // Calling the function: getS3Client
  s3Client, err := getS3Client(ctx, objectStorageName, userCredentials)
  if err == nil {
    // Calling the function: createBucket
    createBucketOutput, err := createBucket(ctx, objectStorageName, s3Client, localBucketName)
    // Calling the function: listBuckets
    listBucketsOutput, err := listBuckets(ctx, s3Client)
    if err == nil {
      // Printing the existed bucket names
      for _, bucket := range listBucketsOutput.Buckets {
        fmt.Println(*bucket.Name)
      }
    }
  }
}
```

<!-- markdownlint-disable DOCSMD004 -->
::: info Created new bucket URL
As the S3 path-style addressing model is used, the bucket's effective URL is:

```url
https://s3.app.zerops.io/records
```

:::
<!-- markdownlint-enable DOCSMD004 -->
