# Using your domain to access service

You can easily set up routing rules — which domains and their locations should point to which service inside your [project](/documentation/overview/projects-and-services-structure.html#project).

![Domain add](/domain-add.png "Domain add")

All you need to do it point your domains A and / or AAAA records to one of the [unique IP addresses](/documentation/routing/unique-ipv4-ipv6-addresses.html) assigned to your [project](/documentation/overview/projects-and-services-structure.html#project).

**[Let's encrypt](https://letsencrypt.org/) SSL Certificate can be automatically installed for you.**

![Domains](/domains.png "Domains")

**Domain access can be enabled only on services running on HTTP protocol**. Internally Zerops points all traffic to a L7 HTTP Balancer that takes care of SSL certificate installation and load balancing traffic to selected container running your app.

![L7 balancer](/l7balancer.png "L7 balancer")
