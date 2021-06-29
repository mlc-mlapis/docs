# Project & Services Structure

## Project

Zerops structure has three levels. At the top is a project, which can have services, which are made of containers. It can, for example, consist of a NodeJS [runtime environment](/documentation/services/runtimes.html), a MongoDB [database](/documentation/services/databases/mongodb.html), and an S3 [object storage](/documentation/services/storage.html) services.

You can create a separate project for any environment (development, stage, production) or even for each developer if you want. Or benefit from a single project shared among all developers reducing the cost. In both ways, developers can still utilize our powerful [dev tools](/documentation/cli/vpn.html).

All services inside such a project share a [dedicated private network](/documentation/routing/routing-between-project-services.html) and can see and reference [environment variables](/documentation/environment-variables/how-to-access.html) from other services.

By default, nothing outside the project can access any of the services inside. Each service can be made publicly accessible through Zerops subdomains (*.app.zerops.io) or [domains](/documentation/routing/using-your-domain.html), pointing your DNS records to the [IPv6](/documentation/routing/unique-ipv4-ipv6-addresses.html) or [IPv4](/documentation/overview/pricing.html#project-add-ons) addresses assigned to the project, or by setting up direct access by [opening public ports](/documentation/routing/access-through-ip-and-firewall.html) on the assigned IP addresses. A built-in optional [firewall](/documentation/routing/access-through-ip-and-firewall.html) can manage the direct access by defining a list of allowed and denied IP addresses for each open public port.

The screenshot below shows an example of such a project, our own website. The project is called **zerops-web-prod**, and it consists of 2 runtimes (Node.js® and Golang), a static web server (Nginx), a database (MongoDB), and an S3 object storage services. It is made accessible to the public through our domain (`zerops.io`).

:::: tabs
::: tab Zerops Web Project in GUI
![Zerops Web Project](./images/Zerops-Web-Production.png "Zerops Web Project in GUI")
:::
::: tab Schema of Zerops Web Project
![Zerops Web Project](./images/Zerops-Web-Production-Schema.png "Schema of Zerops Web Project")
:::
::::

Each project has the following items included in its [Basic Package](/documentation/overview/pricing.html#projects):

* 1 unique IPv6 address
* project balancers & core controllers
* firewall
* 100 build minutes
* daily backup
* 10 GB of outbound traffic

More details can be found in the [pricing](/documentation/overview/pricing.html) document.

## Services & Containers

Services are the most important part of Zerops. Each service consists of one, or multiple [Linux Containers](https://linuxcontainers.org/#LXD) (depending on your HA preference), each container running a Zerops managed image of technology, whether it’s a [runtime environment](/documentation/services/runtimes.html), a [static web server](/documentation/services/static-servers.html), a [database](/documentation/services/databases.html), a [storage](/documentation/services/storage.html), a [search engine](/documentation/services/storage.html), or a [message broker](/documentation/services/storage.html). Each service has a hostname and an N number of ports. It can be made public via [Zerops subdomains](/documentation/routing/zerops-subdomain.html) or [public domains](/documentation/routing/using-your-domain.html) (HTTP/S communication) or direct [IPv6/IPv4 addresses and ports](/documentation/routing/access-through-ip-and-firewall.html) mapping.

![Services](./images//Zerops-Services-Catalogue.png "Available Services")

A project can contain an [unlimited number of services](/documentation/overview/made-for-developers.html#each-developer-should-have-his-own-account-no-artificial-pricing-boosting). Depending on the type of service, they are either fully managed by Zerops (scaling, repairing, routing) or partially managed by Zerops while giving you straightforward management abilities through the Zerops app.

### Runtime environments

[Node.js®](/documentation/services/runtimes.html#node-js), [Golang](/documentation/services/runtimes.html#golang), [PHP](/documentation/services/runtimes.html#php)

### Static web server services

[Nginx](/documentation/services/static-servers.html)

### Database services

[MariaDB (MySQL)](/documentation/services/databases/mariadb.html), [MongoDB](/documentation/services/databases/mongodb.html), [Redis](/documentation/services/databases/redis.html)

### Search engine services

[Elasticsearch](/documentation/services/search-engines.html#elasticsearch)

### Message broker services

[RabbitMQ](/documentation/services/message-brokers.html#rabbitmq)

### Storage services

[Shared storage](/documentation/services/storage.html#shared-storage), [S3 compatible Object Storage](/documentation/services/storage.html#s3-compatible-object-storage)
