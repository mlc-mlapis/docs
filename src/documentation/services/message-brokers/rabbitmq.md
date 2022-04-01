# RabbitMQ

Zerops provides a fully managed and scaled [RabbitMQ](https://www.rabbitmq.com) service, suitable for both development and production projects using any load. It's a highly available, fault tolerant and scalable message queuing solution. It understands the AMQP (Advanced Message Queuing Protocol), STOMP (Streaming Text Orientated Messaging Protocol), MQTT (Message Queuing Telemetry Transport), and other [protocols](https://www.rabbitmq.com/protocols.html). You can choose any option you wish in the knowledge that it will work.

[[toc]]

## Adding the RabbitMQ Service in Zerops

The Zerops RabbitMQ service is based on a [Linux LXD container](/documentation/overview/projects-and-services-structure.html#services-containers) with **Ubuntu** **==v18.04.06==**.

### Two ways to do it

There are two possible ways to create a new RabbitMQ service. Either manually in the Zerops GUI, as described in the [rest of this document](#which-version-to-choose), or using the Zerops [import functionality](/documentation/export-import/project-service-export-import.html#how-to-export-import-a-project).

#### A simple import example in the YAML syntax

Zerops uses a YAML definition format to describe the structure. To import a service, you can use something similar to the following:

```yaml
services:
  # Service will be accessible through zcli VPN under <protocol>://mq:<port>
  - hostname: mq
    # Type and version of service used.
    type: rabbitmq@3
    # Whether the service will be run on one or multiple containers.
    # Since this is a simple example, using only one container is fine.
    mode: NON_HA
```

A complete specification of the [import/export syntax in the YAML format](/documentation/export-import/project-service-export-import.html#used-yaml-specification).

### Which version to choose

You can currently only choose version **v3** (version 3.9.13 to be precise).

Used as the export & import types: ==`rabbitmq@3`== .

### Hostname and ports

Choose a short and descriptive URL-friendly name, for example, **mq**. The following rules apply:

* maximum length **==25==** characters,
* only lowercase ASCII letters **==a-z==** and numbers **==0-9==**,
* **==has to be unique==** in relation to other existing project hostnames,
* the hostname **==can't be changed==** later.

The ports will automatically be set to the values of **==1883==** (the `mqtt` protocol), **==5672==** (the `amqp` protocol), **==61613==** (the `stomp` protocol), **==15672==** (web management portal),  **==15674==** (web socket for the `stomp` protocol), **==15675==** (web socket for the `mqtt` protocol) and can't be changed.

<!-- markdownlint-disable DOCSMD004 -->
::: warning Hostname is also used as the default admin user name
The chosen **hostname** is automatically used to create an admin user account with all privileges and grant options for accessing the message broker. You can change it later if you prefer. The standard default user `guest` is removed during the installation phase of the service.
:::
<!-- markdownlint-enable DOCSMD004 -->

<!-- markdownlint-disable DOCSMD004 -->
::: warning Security inside a private project network
All services inside a Zerops project share a [dedicated private network](/documentation/routing/routing-between-project-services.html) and can see and reference [environment variables](/documentation/environment-variables/how-to-access.html) from other services. This means that, by default, nothing outside the project can access any of the services inside.

The RabbitMQ service is configured to **allow access** for native `mqtt`, `amqp`, `stomp` protocols only from the project internal network environment. In practice, this means that this service can only be accessed either programmatically through the runtime environment services ([Node.js](/documentation/services/runtimes/nodejs.html#port), [Golang](/documentation/services/runtimes/golang.html#port), and [PHP](/documentation/services/runtimes/php.html#hostname-and-port), which should implement their authentication logic not to allow anonymous access to the RabbitMQ service) or using [zcli](/documentation/cli/installation-authorization.html) and [vpn](/documentation/cli/vpn.html) from your local environment, nothing else.
:::
<!-- markdownlint-enable DOCSMD004 -->

### HA / non-HA message broker mode

When creating a new service, you can choose whether the database should be run in **HA** (High Availability) mode, using 3 containers, or **non-HA mode**, using only 1 container. ==**The chosen database mode can't be changed later.**== If you would like to learn more about the technical details and how this service is built internally, take a look at the [RabbitMQ Service in HA Mode, Internal](/documentation/overview/how-zerops-works-inside/rabbitmq-cluster-internally.html).

#### RabbitMQ in non-HA mode

* great for local development to save money,
* queues data are stored only in a single container, higher risk of loss,
* all queues data changes since the last backup are not recoverable,
* not recommended for production projects.

#### RabbitMQ in HA mode

* will run on three containers as a [cluster](https://www.rabbitmq.com/clustering.html), each on a **different physical machine**,
* so the queues data are stored redundantly in three places, with no risk of loss,
* when one container fails, it's automatically replaced with a new one,
* with two load balancers ([HAProxy](http://www.haproxy.org)) (no additional cost),
* recommended for production projects.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Default Zerops maintenance user
For system maintenance reasons, the `zps` user is also automatically created with all privileges. It's important not to change it in any way. Otherwise, there is a risk of disrupting the correct functionality, especially in HA mode.
:::
<!-- markdownlint-enable DOCSMD004 -->

## How to access a RabbitMQ message broker

<!-- markdownlint-disable DOCSMD004 -->
::: warning Don't use additional security protocols for internal communication
The messaging service is not configured to support direct access using SSL/TLS or SSH protocols for internal communication inside a Zerops project private secured network. This is also the case for access using the Zerops [zcli](/documentation/cli/installation.html) through a secure VPN channel.
:::
<!-- markdownlint-enable DOCSMD004 -->

### From other services inside the project

Other services can access the database using its **hostname** and **port**, as they are part of the same private project network. It’s highly recommended that you utilize the **==connectionString==** environment variable that Zerops creates automatically for the message broker in non-HA mode. See also the explanation of environment variables specifics for HA mode below. More information related to **connectionString** can be found in the dedicated [environment variables](/documentation/environment-variables/how-to-access.html) section. See also a list of all automatically generated [environment variables](/documentation/environment-variables/helper-variables.html#rabbitmq) for the RabbitMQ service.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Environment variables specifics for HA mode
Due to the Patroni cluster functionality, you can use an additional connection string to connect to the database in HA mode. It is ==**connectionStringReplicas**== , used to connect to any member (all standby replica instances + the current primary instance) of the database cluster to retrieve already existing data (only reading operations via SQL SELECT queries). The corresponding  ==**portReplicas**== environment variable value is used under the hood.

The names of ==**connectionString**== and ==**port**== are kept the same, but in HA mode, using them is reserved for creating a connection to the current primary instance and mainly processing all data modification requests (via SQL INSERT, UPDATE, and DELETE statements). And of course, any SELECT statement can also be sent, nothing prevents this from happening.
:::
<!-- markdownlint-enable DOCSMD004 -->

For more flexibility with future potential hostname changes, it's always recommended to use them indirectly via [custom environment variables](/knowledge-base/best-practices/how-to-use-environment-variables-efficiently.html) (referencing implicit Zerops environment [variables](/documentation/environment-variables/helper-variables.html#postgresql)) in each project service separately. This allows you to eliminate all direct dependencies in the application code, which in turn means simplification and increased flexibility. Another reason not to hard-code the values inside your applications is that it can be dangerous because it is easy to commit them (like your credentials) into a repository, potentially exposing them to more people than intended.

## Default hardware configuration and autoscaling

* Each RabbitMQ container (1 in non-HA, 3 in HA) starts with the technological minimum of vCPUs (allowing a meaningful initial start and response time), 0.5 GB RAM, and 5 GB of disk space.
* Zerops will only automatically scale the database [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (both in non-HA and HA mode).
* The [horizontal autoscaling](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) in HA mode is not applied because of optimal performance.
