# How to make my code high availability ready

There are two main rules when it comes to writing high availability ready code:

### Whatever you deploy has to be the source of truth

Since your application will possibly run on multiple containers as it [automatically scales](/documentation/automatic-scaling/how-automatic-scaling-works.html) up and down, it is essential they all run the same code. Which means your application should NOT change itself (as is the case with "installers" and setups).

Take WordPress for example, you'd deploy your WordPress to Zerops and then ran the setup configuration. This modifies your application on one single container. Other unmodified containers contain an incomplete setup configuration and as a result the application does not behave as expected.

### Do not use local filesystem

For similar reasons as listed above, your code should not rely on the container's local filesystem. Imagine you were uploading files and save them on the container to the local filesystem. Another request could be running on a different container. Other containers wouldn't have access to the local filesystem of the first container.

The solution is to use either S3 compatible Object Storage service Zerops offers or use Shared Storage service that will be mounted to your services and they will all share the space.
