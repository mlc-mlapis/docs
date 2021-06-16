# MariaDB (MySQL)

[[toc]]

<!-- markdownlint-disable DOCSMD004 -->
::: details Compatibility & Differences to MySQL
Information on the compatibility of MariaDB software with similar, competing software, as well as their differences, can be found [here](https://mariadb.com/kb/en/compatibility-differences).
:::
<!-- markdownlint-enable DOCSMD004 -->

## Adding MariaDB service in Zerops

### Version to choose

You can actually choose **v10.4** or **v10.3**. The chosen version of the database **can't be changed afterward**, and switching has to be done manually by creating a new service with another version and migrating data. We, however, plan to implement service cloning, allowing you safe migration so that this limitation will be removed soon.

### Hostname and port

Choose a short and descriptive URL-friendly name, for example, **db**. The following rules are required:

* maximum length **==25==** characters
* only lower ASCII letter **==a-z==** and numbers **==0-9==**

The port will automatically be set to the value of **==3306==** and can't be changed.

### HA / non-HA database mode

When creating a new service, you can choose whether the database should be run in **HA** (High Availability) mode, using 3 containers, or **non-HA mode**, using only 1 container. To help you to decide, look at the [Choosing the right database mode](#choosing-right-database-mode) section below. The chosen database mode can't be changed later. We, however, plan to implement service cloning, allowing you safe migration.

## Choosing the right database mode

<!-- markdownlint-disable DOCSMD004 -->
::: warning Volatile non-database storage
Each container has a separate disk space, which can theoretically be used by appropriate APIs of the database service and thus store data outside the replicated contents of the database. It should be noted that such data is considered volatile (reserved for this particular instance only). It will not be migrated if such a container is deleted due to a failure of this container. If it is necessary to store and share such data at the database level permanently, developers should use Zerops object storage or shared storage services. Also, separate direct access to an individual MariaDB instance is not supported in any way.
:::
<!-- markdownlint-enable DOCSMD004 -->

### Database in non-HA mode

* great for local development to save money,
* it doesn’t require any changes to the existed code,
* theoretically no limitations, but see the recommendation tip below,
* runs on a single container, higher risk of data loss,
* not recommended for production projects.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Recommendation
Even when using a non-HA mode for a production project, you should still respect all [HA mode limitations](#mariadb-service-limitations-in-ha-mode) because you never know when you'll need to switch to it. It's also true from the used storage engine as InnoDB is the only option in HA mode.
:::
<!-- markdownlint-enable DOCSMD004 -->

### Database in HA mode

* will run on three containers as a [Galera cluster](https://mariadb.com/kb/en/galera-cluster),
* with two load balancers ([MaxScale](https://mariadb.com/kb/en/maxscale)) in [readwritesplit](https://mariadb.com/kb/en/mariadb-maxscale-25-readwritesplit) mode,
* some [limitations](#mariadb-service-limitations-in-ha-mode) related to a Galore cluster,
* recommended for production projects.
  
### HA quirks (make your apps work with HA databases)

#### Asynchronous behavior of MariaDB HA cluster

When data is stored in a MariaDB cluster (through its actual primary database instance), it is replicated across other replica instances asynchronously. This means that if one SQL statement stores some data, the next immediate statement may not retrieve the same data. The reason is that the given statement will be executed against another replica instance. If required to get the same data, it's necessary to encapsulate both commands into a single SQL transaction, which will always be executed against the primary instance.

You can also force synchronization waits for causality checks on a cluster by [wsrep_sync_wait](https://mariadb.com/docs/reference/mdb/system-variables/wsrep_sync_wait) bitmask. Enabling it ensures that certain types of queries always execute against the most up to date database state, at the expense of query performance.

## Default hardware configuration and autoscaling

* Each MariaDB container (1 in non-HA, 3 in HA) and each load balancer container will start with 1 vCPU, 0.25 GB RAM, and 0.5 GB of disk space.
* Zerops will automatically scale the database only [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (both of non-HA and HA).
* The [horizontal autoscaling](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) in HA mode is not applied because of the optimal performance.
* Each container runs on a **different physical machine**.

## How to connect to MariaDB database

### From other services inside the project

Other services can access the database using its **hostname** and **port**, as they are part of the same private project network, but it’s highly recommended to utilize the **==connectionString==** environment variable that Zerops creates automatically for each database, especially when using HA mode, as it makes sure to include all the info required for HA, more info in the dedicated [environment variables](/documentation/environment-variables/how-to-access.html) section, related to **connectionString**. See also a list of all automatically generated [variables](/documentation/environment-variables/helper-variables.html#mariadb) for MariaDB service.

### From local development environment

To connect to the database from your local workspace, you can utilize the [VPN](/documentation/cli/vpn.html) functionality of our [CLI](/documentation/cli/installation.html). This allows you to access the database the same way as other services inside the project, but you can not use references to the environment variables, unlike other services. Therefore you should copy the values manually through the „**How To Access** / **Database access details**“ section of the service detail in your application.

![MariaDB Service](/services/MariaDB/Database-Access-Details.png "Database Access Details")

## Default MariaDB user and password

Zerops automatically creates the root access when creating the service, where the **==user==** is based on the selected **hostname**, and the **==password==** is randomly generated. These are saved to environment variables **user** and **password** and can be referenced from other services the same way as **connectionString**.

<!-- markdownlint-disable DOCSMD004 -->
::: warning Zerops doesn’t keep both places in sync
If you change your password inside the MariaDB database directly, the change is not reflected in the environment variable and vice versa. It’s up to you to keep these up to date through the „**Service env. Variables**“ section of the service detail in your application.

![MariaDB Service](/services/MariaDB/Database-Access-Change-Password.png "Database Access Change Password")
:::

## How to backup / restore database data

### Using mysql CLI

First, connect to the database service using [zcli](/documentation/cli/installation.html).

#### Logical database backup

```powershell
mysqldump -u root -p[root_password] -x [database_name] > filename.dump
```

#### Logical database restore

```powershell
mysql -u root -p[root_password] [database_name] < filename.dump
```

### Using Adminer / phpMyAdmin

Create a new [PHP service](/documentation/services/runtimes.html#php) and upload the PHP script file. You can access the MariaDB database service by its connection string or its hostname, port, user, and password.

### Using your favorite database management tool

First, connect to the database using [zcli](/documentation/cli/installation.html). You can use a connection string of MariaDB service inside your tool then.

## MariaDB service limitations in HA mode

* Only InnoDB storage engine is supported.
* No support for explicit locks, including LOCK TABLES, FLUSH TABLES {explicit table list} WITH READ LOCK, GET_LOCK, RELEASE_LOCK, etc. **These problems can be avoided by using transactions.** Global locking operators like FLUSH TABLES WITH READ LOCK are supported.
* All database tables should have a primary key (multi-column primary keys can also be used). **DELETE operations are unsupported on tables without a primary key.**
* Distributed [XA transactions](https://mariadb.com/kb/en/xa-transactions) are not supported.
* [AUTO_INCREMENT](https://galeracluster.com/library/kb/auto-increment-multiples.html) automatically uses the number of nodes in a Galera cluster as an increment. It means that it's not possible to rely on that the next auto-generated value will be max(x)+1.
* Other details about limitations and behavior of MariaDB Galera clusters and MaxScale load balancers are available on [MariaDB Galera Cluster - Known Limitations](https://mariadb.com/kb/en/mariadb-galera-cluster-known-limitations) and [Limitations and Known Issues within MariaDB MaxScale](https://mariadb.com/kb/en/mariadb-maxscale-25-limitations-and-known-issues-within-mariadb-maxscale).
