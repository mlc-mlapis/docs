# Project & Service Structure

## Project

Zerops project is a group of services united by a name. It can for example consist of a nodejs [runtime](/documentation/services/runtimes.html) with a mongo [database](/documentation/services/databases.html) and an object storage.

We [encourage](/documentation/overview/made-for-developers.html#each-developer-should-have-his-own-account-no-artificial-pricing-boosting) you to create a project for each environment, i.e. `myapp-production`, `myapp-stage`, `myapp-devel`, or even for each developer, i.e. `myapp-johnd`. You can add unlimited number of projects, you only [pay for the usage](/documentation/overview/pricing.html) that goes over the [free basic performance](/documentation/overview/pricing.html#free-tier-unlimited-projects-and-team-members). So each developer can have their own copy of a project to develop on, utilizing our powerful [dev tools](/documentation/cli/vpn.html).

All services inside the project share a [private network](/documentation/routing/routing-between-project-services.html) and can see and reference [environment variables](/documentation/environment-variables/how-to-access.html) from other services.

Each project has assigned a unique [IPv6 address](/documentation/routing/unique-ipv4-ipv6-addresses.html) and optionally an [IPv4 address](/documentation/routing/unique-ipv4-ipv6-addresses.html). You can then either set up public access through [domains](/documentation/routing/using-your-domain.html)  and point your DNS records to the assigned IP addresses, or set up direct access to the service through the IP by [opening public ports](/documentation/routing/access-through-ip-and-firewall.html). Direct access can be managed by a built in [firewall](/documentation/routing/access-through-ip-and-firewall.html).

<br />

![Project card](/project-card.png "Project card")


## Service

Services are the most important part of Zerops. Each service consists of a cluster of linux containers running a zerops managed image of a technology, whether it's a [runtime](/documentation/services/runtimes.html), [database](/documentation/services/databases.html), [storage](/documentation/services/storage.html) or a [static webserver](/documentation/services/static-server.html)). Each service has a hostname and an _n_ number of [ports](/documentation/routing/routing-between-project-services.html), it can be made [public by a domain](/documentation/routing/using-your-domain.html) in case of HTTP(s) services, or by an [IP adress and a port](/documentation/routing/access-through-ip-and-firewall.html).

![Service card](/service-card.png "Service card")

<br />

A project can have [unlimited number of services](/documentation/overview/made-for-developers.html#each-developer-should-have-his-own-account-no-artificial-pricing-boosting). Services are of different types and depending on the type they are either fully managed by Zerops, or partially managed by Zerops while giving you straightforward management abilities through zerops app.

<br />

![Add service](/add-service.png "Add service")

<br />

### Runtime services
[Node.js](/documentation/services/runtimes.html#node-js), [Golang](/documentation/services/runtimes.html#golang), [PHP](/documentation/services/runtimes.html#php)

### Database services
[MariaDB (MySQL)](/documentation/services/databases.html#mariadb-mysql), [MongoDB](/documentation/services/databases.html#mongodb), [Redis](/documentation/services/databases.html#redis), [Elasticsearch](/documentation/services/databases.html#elasticsearch), 

## Message broker services 
[RabbitMQ](/documentation/services/databases.html#rabbitmq)

### Static webserver
[Nginx](/documentation/services/static-server.html)

### Storage services
[Shared storage](/documentation/services/storage.html#shared-storage), [S3 compatible Object Storage](/documentation/services/storage.html#s3-compatible-object-storage)

<br />

::: warning Internal services
Each project also has one or two internal services. A core service which provides secure data communication between the Internet and your project, storage for application logs and technical statistics. And an l7 balancer, which handles HTTP(s) traffic from the Internet to your applications,  HTTP(s) routing over Zerops subdomain or your own domain and SSL certificates.
:::
