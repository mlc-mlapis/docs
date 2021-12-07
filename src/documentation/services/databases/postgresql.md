# PostgreSQL

Zerops provides a fully managed and scaled PostgreSQL database service, suitable for both development and production projects on any load. You can choose any variant you want, and you can be sure that it will work. Your certainty and peaceful sleep are our top priority.

[[toc]]

## Adding the PostgreSQL Service in Zerops

Zerops PostgreSQL service is based on a [Linux LXD container](/documentation/overview/projects-and-services-structure.html#services-containers).

### Two ways how to do it

You have two possible ways to create a new PostgreSQL service. Either manually in the Zerops GUI, as described in the [rest of this document](#version-to-choose), or using Zerops [import functionality](/documentation/export-import/project-service-export-import.html#how-to-export-import-a-project).

#### Simple import example in the YAML syntax

Zerops uses a YAML definition format to describe the structure. To import a service, you can use something similar to the following.

```yaml
services:
  # Service will be accessible through zcli VPN under: http://db
  - hostname: db
    # Type and version of a used service.
    type: postgresql@12
    # Whether the service will be run on one or multiple containers.
    # Since this is a simple example, using only one container is fine.
    mode: NON_HA
```

A complete specification of the [import/export syntax in the YAML format](/documentation/export-import/project-service-export-import.html#used-yaml-specification).

### Version to choose

You can currently choose PostgreSQL version **v12** (exactly it's the 12.7 version).

Used as the export & import type: ==`postgresql@12`== .

### Hostname and ports

Choose a short and descriptive URL-friendly name, for example, **db**. The following rules apply:

* maximum length **==25==** characters,
* only lowercase ASCII letters **==a-z==** and numbers **==0-9==**,
* **==has to be unique==** in relation to other existing project's hostnames,
* the hostname **==can't be changed==** later.

The port will automatically be set to the value of **==5432==** and can't be changed. It's important to mention that when HA mode is chosen, the additional port of **==5433==** is also automatically set. It allows to send read-only requests to all members of the PostgreSQL cluster. If a data change request is sent to this port by a mistake or an error and it will be directed to a standby replica member of the HA cluster, then the statement will be rejected.

<!-- markdownlint-disable DOCSMD004 -->
::: warning Hostname is also used as the default admin user name
The chosen **hostname** is automatically used to create an [admin user account](#default-postgresql-user-and-password) with all privileges and grant options for accessing the database. You can change it later if you prefer.
:::
<!-- markdownlint-enable DOCSMD004 -->

### HA / non-HA database mode

When creating a new service, you can choose whether the database should be run in **HA** (High Availability) mode, using 3 containers, or **non-HA mode**, using only 1 container. ==**The chosen database mode can't be changed later.**== If you would like to learn more about the technical details and how this service is internally built, take a look at the [PostgreSQL Service in HA Mode, Internal](/documentation/overview/how-zerops-works-inside/postgresql-patroni-cluster-internally.html).

#### PostgreSQL in non-HA mode

* great for local development to save money,
* doesn’t require any changes to the existing code,
* not necessary to respect HA mode [specifics](#what-you-should-remember-when-using-the-ha-mode), but see the recommendation tip below,
* data is stored only in a single container, higher risk of data loss,
* all data changes since the last backup is not recoverable,
* not recommended for production projects.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Recommendation
Even when using the non-HA mode for a production project, we nonetheless recommend you respect all of the [HA mode specifics](#what-you-should-remember-when-using-the-ha-mode) because you never know when you'll need to switch to the HA mode.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### PostgreSQL in HA mode

* will run on three containers as a [Patroni cluster](https://patroni.readthedocs.io), each on a **different physical machine**,
* so the data is stored redundantly in three places, with no risk of data loss,
* when one container fails, it's automatically replaced with a new one,
* with two load balancers ([HAProxy](http://www.haproxy.org)) (no additional cost),
* [asynchronous behavior](#asynchronous-behavior) of a Patroni HA cluster,
* the need to respect all of the [specifics](#what-you-should-remember-when-using-the-ha-mode) related to a Patroni HA cluster,
* recommended for production projects.

## How to access a PostgreSQL database

<!-- markdownlint-disable DOCSMD004 -->
::: warning Don't use additional security protocols for internal communication
The database service is not configured to support direct access using SSL/TLS or SSH protocols for internal communication inside a Zerops project private secured network. This is also the case for access using the Zerops [zcli](/documentation/cli/installation.html) through a secure VPN channel.
:::
<!-- markdownlint-enable DOCSMD004 -->

### From other services inside the project

Other services can access the database using its **hostname** and **port**, as they are part of the same private project network. It’s highly recommended to utilize the **==connectionString==** environment variable that Zerops creates automatically for the database in non-HA mode. See also the explanation of environment variables specifics for HA mode below. More info in the dedicated [environment variables](/documentation/environment-variables/how-to-access.html) section, related to **connectionString**. See also the list of all automatically generated [environment variables](/documentation/environment-variables/helper-variables.html#postgresql) for the PostgreSQL Service.

<!-- markdownlint-disable DOCSMD004 -->
::: info Environment variables specifics for HA mode
Due to the Patroni cluster functionality, you can use an additional connection string to connect to the database in HA mode. It is ==**connectionStringReplicas**== , used to connect to any member (all standby replica instances + the current primary instance) of the database cluster to retrieve already existing data (only reading operations via SQL SELECT queries). The corresponding  ==**portReplicas**== environment variable value is used under the hood.

The names of ==**connectionString**== and ==**port**== are kept the same, but in HA mode, using them is reserved for creating a connection to the current primary instance and mainly processing all data modification requests (via SQL INSERT, UPDATE, and DELETE statements). And of course, any SELECT statement can be sent also, nothing forbids it.
:::
<!-- markdownlint-enable DOCSMD004 -->

For more flexibility with future potential hostname changes, it's always recommended to use them indirectly via [custom environment variables](/knowledge-base/best-practices/how-to-use-environment-variables-efficiently.html) (referencing implicit Zerops environment [variables](/documentation/environment-variables/helper-variables.html#postgresql)) in each project service separately. This allows you to eliminate all direct dependencies in the application code, which in turn means simplification and increased flexibility. Another reason not to hard-code the values inside your applications is that it can be dangerous because it is easy to commit them (like your credentials) into a repository, potentially exposing them to more people than intended.

### From other Zerops projects

Zerops always sets up a [private dedicated network](/documentation/overview/projects-and-services-structure.html#project) for each project. From this point of view, the cross projects communication can be done precisely in the same ways described in the section [From your public domains (common Internet environment)](#from-your-public-domains-common-internet-environment). There isn't any other specific way. The projects are not directly interconnected.

### From your local environment

The local environment offers ==**not only possibilities for local development**== but also a general ability to ==**manage all Zerops development or production services**== , using zcli VPN.

To connect to the database from your local workspace, you can utilize the [VPN](/documentation/cli/vpn.html) functionality of our [Zerops zcli](/documentation/cli/installation.html), as said before. This allows you to access the database the same way other services inside the project can, but unlike those services, you cannot use references to the environment variables. Therefore, you should copy the values manually through the „**How To Access** / **Database access details**“ section of the service detail in your application if you need some of them and use them in your private local configuration strategy.

The following picture shows how it looks in non-HA mode.

![PostgreSQL Service](./images/PostgreSQL-Database-Access-Details-Non-HA.png "Database Access Details in non-HA mode")

The following picture shows how it looks in HA mode.

![PostgreSQL Service](./images/PostgreSQL-Database-Access-Details-HA.png "Database Access Details in HA mode")

### From your public domains (common Internet environment)

You can't access the PostgreSQL service directly in any way. You have to use one of the runtime environment services ([Node.js](/documentation/services/runtimes/nodejs.html), [Golang](/documentation/services/runtimes/golang.html), [PHP](/documentation/services/runtimes/php.html)) and go indirectly through them in a programmatic way.

To understand this better, take a look at the section [With external access](/documentation/overview/how-zerops-works-inside/typical-schemas-of-zerops-projects.html#with-external-access) of **Typical schemas of Zerops Projects**.

## Default PostgreSQL user and password

Zerops automatically creates a user with all privileges and grant options when creating the service, where the name of **==user==** is based on the selected **hostname**, and the **==password==** is randomly generated. These are saved to the environment variables **user** and **password** and can be referenced from other services the same way as **connectionString**.

<!-- markdownlint-disable DOCSMD004 -->
::: warning Zerops doesn’t keep both places in sync
If you change your password inside the PostgreSQL database directly, the change is not reflected in the environment variable and vice versa. It’s up to you to keep these up to date through the **Service env. Variables** section of the service detail in your application.

The image below represents the state of environment variables available in non-HA mode (especially the names of the **port** and **connectionString**). In the case of HA mode, the particular situation is different. It's due to the specifics of the Patroni cluster functionality and the ways of client communication with it.

![PostgreSQL Service](./images/PostgreSQL-Database-Access-Change-Password.png "Database Access Change Password")
:::
<!-- markdownlint-enable DOCSMD004 -->

<!-- markdownlint-disable DOCSMD004 -->
::: info Default Zerops maintenance user
For system maintenance reasons, the `zps` user is also automatically created with all privileges (super-user). It's necessary to not change it in any way. Otherwise, there is a risk of disrupting the correct functionality, especially in HA mode. The password for this user can be taken via the `zeropsPassword` environment variable (not presented in the Zerops GUI).

Suppose you log in as the `zps` super-user and make inappropriate changes to the system configuration (especially in the HA cluster setting). You are fully responsible for any system or application failures that may lead to complete data loss.
:::
<!-- markdownlint-enable DOCSMD004 -->

## Default PostgreSQL database

A new database with the name based on the selected **hostname** is created during the initial service setup (for example, database **db** if the chosen hostname was **db**). It means that even if the original default database **postgres** is preserved, the login using **connectionString** without entering the target database will always occur correctly, no matter what value is selected for the hostname. It's also true for any other login type. The standard behavior is that if the target database is not entered, the PostgreSQL authentication logic uses the user name as the target database name.

## Default hardware configuration and autoscaling

* Each PostgreSQL container (1 in non-HA, 3 in HA) starts with 1 vCPU, 1 GB RAM, and 5 GB of disk space.
* Zerops will automatically scale the HW resources both [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (in non-HA and HA mode) and [horizontally](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) (in HA mode only).

## What you should remember when using the HA mode

### Asynchronous behavior

<!-- markdownlint-disable DOCSMD004 -->
::: warning Be sure you understand correctly
When data is stored in a PostgreSQL Patroni cluster (always through its current primary database instance), it is replicated across other standby replica instances asynchronously. As described above, there are two communication channels clients can choose from. The first allows **data writing** through **port 5432**, and the second, allowing **only data reading** through **port 5433**. A reading request can be directed to any cluster member, while a writing request is directed only to the current primary  member of the cluster.

It means that if one SQL statement stores some data through port 5432, the following immediate select query through port 5433 may not retrieve the same data. The reason is that the given select will be executed against another replica instance. If required to get the same data, it's necessary to use the same port for the select query as it was used for storing that data.

A similar case would be with two immediately following SELECT statements to get the same data. The basic premise in such a case is that both select queries are sent over the same TCP connection and therefore routed to the same cluster member. Encapsulating of both commands into a single SQL transaction can guarantee their execution against the same replica instance. Otherwise, send both select requests to the current primary node through port 5432 again.
:::
<!-- markdownlint-enable DOCSMD004 -->

### Non-database local data

Each container has separate local disk space, which can theoretically be used by appropriate APIs of the database service and thus store data outside the replicated contents of the database. It should be noted that such data is reserved only for this particular instance, not mirrored across the PostgreSQL Patroni cluster nor backup-ed. It will not be migrated if such a container is deleted due to its failure. Also, separate direct access to an individual PostgreSQL instance is not supported in any way.

We don't recommend to use any functionality of [COPY](https://www.postgresql.org/docs/current/sql-copy.html) because you can't save/load such data directly to/from any shared storage. Instead of that, use the standard functionality of the [export/import](/documentation/services/databases/postgresql.html#how-to-backup-restore-database-data) mechanism.

### Selected specifics of a Patroni HA cluster

* All database tables should have a primary key (multi-column primary keys can also be used) to get performant and effective streaming replication between the current primary instance and all standby replica nodes through a Write-Ahead Log (WAL). It's the process by which write transactions (INSERT, UPDATE, or DELETE) and schema changes (Data Definition Language - DDL) are reliably captured, logged, and then serially applied to all downstream databases replica nodes in the cluster architecture.
* The PostgreSQL streaming replication is set up asynchronous, and you can't individually change it to synchronous because it has to be done through `postgresql.conf` you don't have access to.
* Using [ALTER SYSTEM](https://www.postgresql.org/docs/12/sql-altersystem.html) and changing `postgresql.auto.conf` is also prohibited because the created [default PostgreSQL user](#default-postgresql-user-and-password) is not a super-user.
