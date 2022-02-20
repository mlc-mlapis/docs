# KeyDB (Redis)

Zerops provides a fully managed and scaled KeyDB (Redis) key-value database service (type of NoSQL database in which keys serve as unique identifiers for their associated values), suitable for both development and production projects on any load. You can choose any variant you wish in the knowledge that it will work. Your peace of mind is our top priority.

[KeyDB](https://github.com/EQ-Alpha/KeyDB#what-is-keydb) is a high performance [fork of Redis](https://github.com/EQ-Alpha/KeyDB#why-fork-redis) with a focus on multi-threading, memory efficiency, and high throughput. KeyDB maintains full compatibility with the Redis protocol, modules, and scripts. All 16 default logical databases on each KeyDB instance can be used and standard KeyDB/Redis protocol is supported without any other limitations.

[[toc]]

## Adding the KeyDB Service in Zerops

Zerops KeyDB service is based on a [Linux LXD container](/documentation/overview/projects-and-services-structure.html#services-containers).

### Two ways to do it

There are two possible ways to create a new KeyDB service. Either manually in the Zerops GUI, as described in the [rest of this document](#which-version-to-choose), or using Zerops [import functionality](/documentation/export-import/project-service-export-import.html#how-to-export-import-a-project).

#### Simple import example in the YAML syntax

Zerops uses a YAML definition format to describe the structure. To import a service, you can use something similar to the following.

```yaml
services:
  # Service will be accessible through zcli VPN under: http://db
  - hostname: db
    # Type and version of a used service.
    type: redis@6
    # Whether the service will be run on one or multiple containers.
    # Since this is a simple example, using only one container is fine.
    mode: NON_HA
```

A complete specification of the [import/export syntax in the YAML format](/documentation/export-import/project-service-export-import.html#used-yaml-specification).

### Which version to choose

You can currently choose KeyDB version **v6** (the 6.0.16 version to be precise).

Used as the export & import type: ==`redis@6`== .

### Hostname and ports

Choose a short and descriptive URL-friendly name, for example, **db**. The following rules apply:

* maximum length **==25==** characters,
* only lowercase ASCII letters **==a-z==** and numbers **==0-9==**,
* **==has to be unique==** in relation to other existing project's hostnames,
* the hostname **==can't be changed==** later.

The port will automatically be set to the value of **==6379==** and can't be changed.

<!-- markdownlint-disable DOCSMD004 -->
::: warning Security inside a private project network
All services inside a Zerops project share a [dedicated private network](/documentation/routing/routing-between-project-services.html) and can see and reference [environment variables](/documentation/environment-variables/how-to-access.html) from other services. This means that, by default, nothing outside the project can access any of the services inside.

The KeyDB service is configured to **allow full and unrestricted access without user authentication** only from the project internal network environment. In practice, this means that this service can only be accessed either programmatically through the runtime environment services ([Node.js](/documentation/services/runtimes/nodejs.html#port), [Golang](/documentation/services/runtimes/golang.html#port), and [PHP](/documentation/services/runtimes/php.html#hostname-and-port), which should implement their authentication logic not to allow anonymous access to the KeyDB service) or using [zcli](/documentation/cli/installation-authorization.html) and [vpn](/documentation/cli/vpn.html) from your local environment, nothing else.
:::
<!-- markdownlint-enable DOCSMD004 -->

### HA / non-HA database mode

When creating a new service, you can choose whether the database should be run in **HA** (High Availability) mode, using 2 containers, or **non-HA mode**, using only 1 container. ==**The chosen database mode can't be changed later.**== If you would like to learn more about the technical details and how this service is built internally, take a look at the [KeyDB Service in HA Mode, Internal](/documentation/overview/how-zerops-works-inside/keydb-ha-internally.html).

#### KeyDB in non-HA mode

* great for local development to save money,
* data is stored only in a single container, higher risk of data loss,
* all data changes since the last backup are not recoverable,
* not recommended for production projects.

#### KeyDB in HA mode

* will run on two containers, each on a **different physical machine**,
* so the data is stored redundantly in two places, with no risk of data loss,
* when one container fails, it's automatically replaced with a new one,
* with a project balancer to distribute the load,
* asynchronous behavior of the active replication between containers,
* recommended for production projects.

## How to access a KeyDB database

<!-- markdownlint-disable DOCSMD004 -->
::: warning Don't use additional security protocols for internal communication
The database service is not configured to support direct access using SSL/TLS or SSH protocols for internal communication inside a Zerops project private secured network. This is also the case for access using the Zerops [zcli](/documentation/cli/installation.html) through a secure VPN channel.
:::
<!-- markdownlint-enable DOCSMD004 -->

### From other services inside the project

Other services can access the database using its **hostname** and **port**, as they are part of the same private project network. It’s highly recommended that you utilize the **==connectionString==** environment variable that Zerops creates automatically. More information can be found in the dedicated [environment variables](/documentation/environment-variables/how-to-access.html) section, related to **connectionString**. See also a list of all automatically generated [environment variables](/documentation/environment-variables/helper-variables.html#keydb-redis) for the KeyDB service.

For more flexibility with future potential hostname changes, it's always recommended to use them indirectly via [custom environment variables](/knowledge-base/best-practices/how-to-use-environment-variables-efficiently.html) (referencing implicit Zerops environment [variables](/documentation/environment-variables/helper-variables.html#postgresql)) in each project service separately. This allows you to eliminate all direct dependencies in the application code, which in turn means simplification and increased flexibility. Another reason not to hard-code the values inside your applications is that it can be dangerous because it is easy to commit them (like your credentials) into a repository, potentially exposing them to more people than intended.

### From other Zerops projects

Zerops always sets up a [private dedicated network](/documentation/overview/projects-and-services-structure.html#project) for each project. From this point of view, cross projects communication can be done precisely in the same ways described in the section [From your public domains (common Internet environment)](#from-your-public-domains-common-internet-environment). There isn't any other specific way. The projects are not directly interconnected.

### From your local environment

The local environment offers ==**not only possibilities for local development**== but also a general ability to ==**manage all Zerops development or production services**== , using zcli VPN.

To connect to the database from your local workspace, you can utilize the [VPN](/documentation/cli/vpn.html) functionality of our [Zerops zcli](/documentation/cli/installation.html), as previously mentioned. This allows you to access the database the same way other services inside the project can, but unlike those services, you cannot use references to the environment variables. Therefore, if you need some of them you should copy the values manually through the **How To Access** / **Database access details** section of the service detail in your application and use them in your private local configuration strategy.

![KeyDB Service](./images/KeyDB-Database-Access-Details.png "Database Access Details")

### From your public domains (common Internet environment)

You can't access the KeyDB service directly in any way. You have to use one of the runtime environment services ([Node.js](/documentation/services/runtimes/nodejs.html), [Golang](/documentation/services/runtimes/golang.html), or [PHP](/documentation/services/runtimes/php.html)) and go indirectly through them in a programmatic way. They should implement their authentication logic not to allow anonymous access to the KeyDB service.

To understand this better, take a look at the section [With external access](/documentation/overview/how-zerops-works-inside/typical-schemas-of-zerops-projects.html#with-external-access) of **Typical schemas of Zerops Projects**.

## Default hardware configuration and autoscaling

* Each KeyDB container (1 in non-HA, 2 in HA) starts with 1 vCPU, 0.25 GB RAM, and 5 GB of disk space.
* Zerops will automatically scale the HW resources both in non-HA and HA mode only [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling).

## What you should remember when using HA mode

### Asynchronous behavior

<!-- markdownlint-disable DOCSMD004 -->
::: warning Be sure you understand correctly
When data is stored in a KeyDB service through one database instance, it is replicated to the second active replica instance asynchronously. As a reading request can be directed again to any database instance, there is a slight chance that the previously stored key wouldn't be found. The probability is minuscule because the KeyDB database is primarily an in-memory database with data persistence through point-in-time dataset snapshots at specified intervals.
:::
<!-- markdownlint-enable DOCSMD004 -->

### Non-database local data

Each container has separate local disk space, which can theoretically be used by appropriate APIs of the database service and thus store data outside the replicated contents of the database. It should be noted that such data is reserved solely for this particular instance and not mirrored to another container nor backup-ed. It will not be migrated if such a container is deleted due to failure.
