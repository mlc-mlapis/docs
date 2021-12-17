# Why You Should Want High Availability

High availability mode allows for the [highest possible reliability](/documentation/ha/zerops-enterprise-grade-reliability.html) and the most optimized performance. Each service which has high availability enabled will run on at least two ([runtimes](/documentation/services/runtimes.html#node-js)) hardware-separated containers.

In the case of some databases, they will run on more than two (e.g. [MariaDB (MySQL)](/documentation/services/databases/mariadb.html) with HA enabled will run on three containers and two balancers).

This allows Zerops to scale your apps [horizontally](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) (your runtime can go instantly from 2 to 64 containers and back down in a matter of seconds). Even if the hardware your container is using should fail, Zerops will immediately switch traffic to a different container.

Each container also scales [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) again in a matter of seconds.

HA should be enabled for every production project and is a required first step of Zerops' [automatic scaling](/documentation/automatic-scaling/how-automatic-scaling-works.html).

Since your code needs to be [HA compatible](/documentation/ha/how-to-make-my-code-ha-enabled.html) (mainly by **not** using a local filesystem and instead using a Object Storage or Shared Storage service), you can temporarily force enable HA mode of your service inside your service dashboard.
