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
  "github.com/aws/aws-sdk-go-v2/credentials"
)

// Object storage name.
const objectStorageName = "store"

func getCredentials(objectStorageName string) *credentials.StaticCredentialsProvider {
  // Necessary environment variable names.
  const accessKeyId = "accessKeyId"
  const secretAccessKey = "secretAccessKey"

  accessKeyIdValue, accessKeyIdStatus := os.LookupEnv(objectStorageName + "_" + accessKeyId)
  secretAccessKeyValue, secretAccessKeyStatus := os.LookupEnv(objectStorageName + "_" + secretAccessKey)
  if accessKeyIdStatus && secretAccessKeyStatus {
    credentials := credentials.NewStaticCredentialsProvider(accessKeyIdValue, secretAccessKeyValue, "")
    return &credentials
  }
  return nil
}
```
