# Projects & Services structure

## Project

Zerops project is a group of zerops services united by a name, it can for example consist of a nodejs [runtime]() with a mongo [database]() and an object storage.

We [encourage]() you to create a project for each environemnt, i.e. `myapp-production`, `myapp-stage`, `myapp-devel`, or even for [each developer](), i.e. `myapp-ales`. You can add unlimited number of projects, you only [pay for the usage]() over the [free basic performance](). So each developer can have their own copy of a project to develop on, utilizing our powerfull [dev tools]().

All services inside the project share a [private network]() and can see and reference [environment variables]() from other services.

Each project is assigned a unique [IPv6 address]() and optionally [IPv4 address](), these can be used to set up public access to any of the project's services, either by your [custom domain](), [direct access through public ports]() of the unique IP managed by a built in [firewall]().

<br />

![Project card](/project-card.png "Project card")


## Service

Services are the most important part of Zerops, each service consist of a [cluster]() of replicated linux containers running a technology, whether it's a [runtime](), [database](), [storage]() or a [static webserver]()). Each service has a hostname and an _n_ number of [ports](), it can be made [public by a domain](), or by an [IP adress and a port]().

![Service card](/service-card.png "Service card")

<br />

A project can have [unlimited number of services](). Services are of different types and depending on the type they are either fully managed by zerops, or managed by zerops while giving you straighforward management abilities through our app.

<br />

![Add service](/add-service.png "Add service")

<br />

### Runtime services
[Node.js](), [Golang](), [PHP]()

### Database and broker services
[MariaDB (MySQL)](), [MongoDB](), [Redis](), [Elasticsearch](), [RabbitMQ]()

### Static webserver
[Nginx]()

### Storage services
[Shared storage](), [S3 compatible Object Storage]()

<br />

::: warning Internal services
Each project also have one or two internal services. A core service which rovides secure data communication between the internet and your project, storage for application logs and technical statistics. And l7 balancer, which handles HTTP data traffic from the internet to your applications: HTTP routing over Zerops subdomain or your own domain and SSL certificates.
:::
