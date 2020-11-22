# Why should I want high availability

High availability mode allows for the the [highest possible reliability]() and the most optimized performance. Each service with High Availability enabled will run on at least two ([runtimes]()) [hardware separated]() containers, in case of some databases on even more (MySQL with HA enabled will run on three containers and two balancers).

This allows Zerops to scale your apps horizontally (your runtime can go instantly from 2 to 64 and back down in matter of seconds), load balancing the traffic between them. Even if the hardware your container is running would fail, Zerops would immediatelly switch the traffic to a different container.

HA should be enabled in every production project and is required as the first step of Zerops [automatic scaling]() when scaling up.

Since your code needs to be [HA compatible]() (mainly by **not** using local filesystem and instead using Object Storage or Shared Storage service), you can temporarily force enable HA mode of your service inside your service dashboard.
