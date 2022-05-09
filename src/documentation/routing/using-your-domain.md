# Using Your Domain to Access a Service

You can easily set up routing rules — which domains and their locations should point to which service inside your [project](/documentation/overview/projects-and-services-structure.html#project).

![Domain add](/domain-add.png "Domain add")

All you need to do is point your domain A / AAAA records to one of the [unique IP addresses](/documentation/routing/unique-ipv4-ipv6-addresses.html) assigned to your [project](/documentation/overview/projects-and-services-structure.html#project) or the free [shared IPv4](/documentation/routing/using-shared-ipv4.html).

**[Let's encrypt](https://letsencrypt.org/) SSL Certificate can be automatically installed for you.**

![Domains](/domains.png "Domains")

**Domain access can only be enabled for services running on an HTTP protocol**. Internally, Zerops points all traffic to an L7 HTTP Balancer that takes care of SSL certificate installation and load balancing traffic to the selected container which is running your app.

![L7 balancer](/l7balancer.png "L7 balancer")

<!-- markdownlint-disable DOCSMD004 -->
::: warning HTTP UPLOAD limit
The file **HTTP UPLOAD** transfer limit is set to **512 MB** for domain access. When this limit is reached, the operation is terminated.
:::
<!-- markdownlint-enable DOCSMD004 -->