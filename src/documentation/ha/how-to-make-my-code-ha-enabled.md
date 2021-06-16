# How to Make My Code High Availability Ready

There are two main rules when it comes to writing high availability ready code:

### Whatever you deploy has to be the source of truth

Since your application will possibly run on multiple containers as it [automatically scales](/documentation/automatic-scaling/how-automatic-scaling-works.html) up and down, it is essential they all run the same code. Which means your application should NOT change itself (as is the case with "installers" and setups).

Take WordPress for example: you'd deploy your WordPress to Zerops and then run the setup configuration. This modifies your application on one single container. Other unmodified containers contain an incomplete setup configuration and as a result your application will not behave as expected.

### Do not use the local filesystem

For similar reasons as listed above, your code should not rely on the container's local filesystem. Imagine you were uploading files and saving them on the container to the local filesystem. Another request could be running on a different container. Other containers wouldn't have access to the local filesystem of the first container.

The solution is to use either an [S3 compatible Object Storage](/documentation/services/storage.html#s3-compatible-object-storage) service Zerops offers or to use a [Shared storage](/documentation/services/storage.html#shared-storage) service that will be mounted to your services and they will all share the space.

There are situations when it's ok to use a local filesystem, just always have in mind that:

- the local filesystem is not shared across containers, it **cannot** be guaranteed that all request from a single client will be pointed to the same container (even though balancer is set to prefer this)
- temp data will not survive service restart (Zerops will never restart itself, only when requested by user)
- php applications can utilize `/var/tmp` which has tmpfs filesystem mounted, but these are saved to memory and will not survive restart
- if any of the containers fail, Zerops will launch a new one using the latest deployed application version artifact with an empty filesystem
- sessions should be saved to, for example, [Redis](/documentation/services/databases/redis.html)




