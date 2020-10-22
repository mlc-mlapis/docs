# Project & Service Structure

## Project

Zerops project is a group of Zerops services united by a name. It can for example consist of a nodejs [runtime]() with a mongo [database]() and an object storage.

We [encourage]() you to create a project for each environemnt, i.e. `myapp-production`, `myapp-stage`, `myapp-devel`, or even for [each developer](), i.e. `myapp-johnd`. You can add unlimited number of projects, you only [pay for the usage]() that goes over the [free basic performance](). So each developer can have their own copy of a project to develop on, utilizing our powerful [dev tools]().

All services inside the project share a [private network]() and can see and reference [environment variables]() from other services.

Each project is assigned a unique [IPv6 address]() and optionally an [IPv4 address](). These can be used to set up public access to any of the project's services, either by your [custom domain]() or [direct access through public ports]() of the unique IP managed by a built in [firewall]().

<br />

![Project card](/project-card.png "Project card")


## Service

Services are the most important part of Zerops. Each service consists of a [cluster]() of replicated linux containers running a technology, whether it's a [runtime](), [database](), [storage]() or a [static webserver]()). Each service has a hostname and an _n_ number of [ports](), it can be made [public by a domain](), or by an [IP adress and a port]().

![Service card](/service-card.png "Service card")

<br />

A project can have [unlimited number of services](). Services are of different types and depending on the type they are either fully managed by Zerops, or partially managed by Zerops while giving you straighforward management abilities through our app.

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
Each project also has one or two internal services. A core service which provides secure data communication between the Internet and your project, storage for application logs and technical statistics. And an l7 balancer, which handles HTTP data traffic from the Internet to your applications: HTTP routing over Zerops subdomain or your own domain and SSL certificates.
:::
