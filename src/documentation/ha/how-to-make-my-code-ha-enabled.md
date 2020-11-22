# How to make my code HA-enabled

There are two main rules when it comes to writting HA-enabled code:

### Whatever you deploy has to be the source of truth

Since you application will possibly run on multiple containers as it [automatically scales]() up and down, it is absolutely essential they all run the same code. Which means your application should NOT change itself (as is the case with "installers" and setups). Take WordPress for example, you'd deploy your WordPress to Zerops and then ran the setup configuration. This would modify your code on that single container the balancer sent you to, but it would still be unmodified on any other or new container.

### Do not use local filesystem

For similar reasons as listed above, your code should not rely on container's local filesystem. Imagine you were uploading files and save them to the local `/tmp` of the container, but the script that would process your uploaded file would be run on a different container, but this other container wouldn't have access to the temp folder of the first container.

The solution is to use either S3 compatible Object Storage service Zerops offers or use Shared Storage service that will be mounted to your services and they will all share the space.
