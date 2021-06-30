# MariaDB (MySQL)

Zerops provides a fully managed and scaled MariaDB (MySQL) database service, suitable for both development and production projects on any load. You can choose any variant you want, and you can be sure that it will work. Your certainty and peaceful sleep are our top priority.

<!-- markdownlint-disable DOCSMD004 -->
::: details Compatibility & Differences to MySQL
Information on the compatibility of MariaDB software with similar, competing software, as well as their differences, can be found [here](https://mariadb.com/kb/en/compatibility-differences).
:::
<!-- markdownlint-enable DOCSMD004 -->

[[toc]]

## Adding MariaDB service in Zerops

### Version to choose

You can currently choose **v10.4** or **v10.3**. The chosen version of the database **can't be changed afterward**. Switching must be done manually by creating a new service with another version and migrating data using a [backup / restore](#how-to-backup-restore-database-data) pattern.

### Hostname and port

Choose a short and descriptive URL-friendly name, for example, **db**. The following rules are required:

* maximum length **==25==** characters,
* only lower ASCII letter **==a-z==** and numbers **==0-9==**,
* **==has to be unique==** among other existed project's hostnames,
* the hostname **==can't be renamed==** later.

For more flexibility with future potential hostnames changes, it's always recommended to use them indirectly via [custom environment variables](#using-custom-variables-for-indirect-referencing) (referencing implicit Zerops environment variables) in each project service separately. This allows you to eliminate all direct dependencies in the application code, which in turn means simplification and increased flexibility.

<!-- markdownlint-disable DOCSMD004 -->
::: warning Hostname is also used as a default admin user name
A chosen **hostname** is automatically used to create an [admin user account](#default-mariadb-user-and-password) with all privileges and grant options for accessing the database. You can change it later if you want.
:::
<!-- markdownlint-enable DOCSMD004 -->

The port will automatically be set to the value of **==3306==** and can't be changed.

### HA / non-HA database mode

When creating a new service, you can choose whether the database should be run in **HA** (High Availability) mode, using 3 containers, or **non-HA mode**, using only 1 container. ==**The chosen database mode can't be changed later.**== If you want to learn more technical details, how this service is internally built, look at [MariaDB service in HA mode internally](/documentation/overview/how-zerops-works-inside/mariadb-galera-cluster-internally.html).

#### MariaDB in non-HA mode

* great for local development to save money,
* it doesn’t require any changes to the existed code,
* not necessary to respect HA mode [specifics](#what-you-should-remember-when-using-ha-mode), but see the recommendation tip below,
* data is stored only in a single container, higher risk of data loss,
* all data changes since the last backup are not recoverable,
* not recommended for production projects.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Recommendation
Even when using a non-HA mode for a production project, you should still respect all [HA mode specifics](#what-you-should-remember-when-using-ha-mode) (earlier or later) because you never know when you'll need to switch to it. It's also true for the used storage engine, as InnoDB is the only option in HA mode.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### MariaDB in HA mode

* will run on three containers as a [Galera cluster](https://mariadb.com/kb/en/galera-cluster), each on a **different physical machine**,
* so the data is stored redundantly in three places, no risk of data loss,
* when one container fails, it's automatically replaced with a new one,
* with two load balancers ([MaxScale](https://mariadb.com/kb/en/maxscale)) in [readwritesplit](https://mariadb.com/kb/en/mariadb-maxscale-25-readwritesplit) mode (no additional cost),
* [asynchronous behavior](#asynchronous-behavior) of a Galera HA cluster,
* only InnoDB storage engine is supported,
* the need to respect all the [specifics](#what-you-should-remember-when-using-ha-mode) related to a Galera HA cluster,
* recommended for production projects.
  
## How to connect to MariaDB database

### From other services inside the project

Other services can access the database using its **hostname** and **port**, as they are part of the same private project network. It’s highly recommended to utilize the **==connectionString==** environment variable that Zerops creates automatically for each database, especially when using HA mode, as it makes sure to include all the info required for HA. More info in the dedicated [environment variables](/documentation/environment-variables/how-to-access.html) section, related to **connectionString**. See also a list of all automatically generated [variables](/documentation/environment-variables/helper-variables.html#mariadb) for MariaDB service.

#### Using custom variables for indirect referencing

In general, the use of a direct reference to another service in code is always potentially problematic, especially in those cases where the identification (hostname in our case) of that service may change. The reason is code changes in many places and the following necessary builds and deploys. That's why using a custom variable that references an implicit environment variable (automatically generated by Zerops) is always in line with the best practices.

For example, if it's necessary to access MariaDB service (with **hostname** set to **==db==**) from Node.js service, a new custom environment variable, like **DEFAULT_DB_CONNECTION_STRING**, should be created with `${db_connectionString}` pattern inside that Node.js service. After that (service restart is necessary), it's possible to use the following code to get the necessary value.

```typescript
const env = process.env;
const DB_CONNECTION_STRING = env['DEFAULT_DB_CONNECTION_STRING'];
```

When a new MariaDB service is created with a different hostname in the future (with **hostname** set to **==dbnew==**), and it's required to switch to it, the only change would be in the definition of that custom variable to `${dbnew_connectionString}`, and no application code changes are necessary at all.

### From local development environment

To connect to the database from your local workspace, you can utilize the [VPN](/documentation/cli/vpn.html) functionality of our [CLI](/documentation/cli/installation.html). This allows you to access the database the same way as other services inside the project, but you can not use references to the environment variables, unlike other services. Therefore you should copy the values manually through the „**How To Access** / **Database access details**“ section of the service detail in your application.

![MariaDB Service](./images/MariaDB-Database-Access-Details.png "Database Access Details")

## Default MariaDB user and password

Zerops automatically creates a user with all privileges and grant options when creating the service, where the name of **==user==** is based on the selected **hostname**, and the **==password==** is randomly generated. These are saved to environment variables **user** and **password** and can be referenced from other services the same way as **connectionString**.

For system maintenance reasons, the `zps` user is also automatically created with all privileges. It's necessary not to change it in any way. Otherwise, there is a risk of disrupting the correct functionality, especially in HA mode.

<!-- markdownlint-disable DOCSMD004 -->
::: warning Zerops doesn’t keep both places in sync
If you change your password inside the MariaDB database directly, the change is not reflected in the environment variable and vice versa. It’s up to you to keep these up to date through the „**Service env. Variables**“ section of the service detail in your application.

![MariaDB Service](./images/MariaDB-Database-Access-Change-Password.png "Database Access Change Password")
:::

## Default hardware configuration and autoscaling

* Each MariaDB container (1 in non-HA, 3 in HA) starts with 1 vCPU, 1 GB RAM, and 5 GB of disk space.
* Zerops will automatically scale the database only [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (both of non-HA and HA).
* The [horizontal autoscaling](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) in HA mode is not applied because of the optimal performance.

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

Create a new [PHP service](/documentation/services/runtimes.html#php) and upload the PHP script file. You can access the MariaDB database service by its connection string or its hostname, port, user, and password. After that, you can use its export/import built-in functions to backup/restore database data to/from your local file system.

### Using your favorite database management tool

First, connect to the database using [zcli](/documentation/cli/installation.html). You can use a connection string of MariaDB service inside your tool then.

## What you should remember when using HA mode

### Asynchronous behavior

<!-- markdownlint-disable DOCSMD004 -->
::: warning Be sure you understand correctly
When data is stored in a MariaDB cluster (through its actual primary database instance), it is replicated across other replica instances asynchronously. This means that if one SQL statement stores some data, the next immediate statement may not retrieve the same data. The reason is that the given statement will be executed against another replica instance. If required to get the same data, it's necessary to encapsulate both commands into a single SQL transaction, which will always be executed against the primary instance (because of the write operation that is included). The same would be the case with two immediately following SELECT statements to get the same data. Again, encapsulation of both commands into a single SQL transaction guarantees their execution against a selected but the same replica instance.

You can also force synchronization waits for causality checks on a cluster by [wsrep_sync_wait](https://mariadb.com/docs/reference/mdb/system-variables/wsrep_sync_wait) bitmask. Enabling it ensures that certain types of queries always execute against the most up to date database state, at the expense of query performance. [Sample usage](https://mariadb.com/kb/en/galera-cluster-system-variables/#wsrep_sync_wait) for a critical read that must have the most up-to-date data:

```sql
 SET SESSION wsrep_sync_wait=1;
 SELECT ...;
 SET SESSION wsrep_sync_wait=0;
```

:::
<!-- markdownlint-enable DOCSMD004 -->

### Non-database local data

Each container has a separate disk space, which can theoretically be used by appropriate APIs of the database service and thus store data outside the replicated contents of the database. It should be noted that such data is reserved only for this particular instance only. It will not be migrated if such a container is deleted due to a failure of this container. If it is necessary to store and share such non-database permanently, developers should use Zerops shared storage services. Also, separate direct access to an individual MariaDB instance is not supported in any way.

Typical operations from this point of view can be a functionality of [SELECT INTO OUTFILE](https://mariadb.com/kb/en/select-into-outfile), [SELECT INTO DUMPFILE](https://mariadb.com/kb/en/select-into-dumpfile), [LOAD_FILE](https://mariadb.com/kb/en/load_file), or [LOAD DATA](https://dev.mysql.com/doc/refman/8.0/en/load-data.html).

### Picked out specifics of a Galera HA cluster

* Only InnoDB storage engine is supported.
* No support for explicit locks, including LOCK TABLES, FLUSH TABLES {explicit table list} WITH READ LOCK, GET_LOCK, RELEASE_LOCK, etc. **These problems can be avoided by using transactions.** Global locking operators like FLUSH TABLES WITH READ LOCK are supported.
* All database tables should have a primary key (multi-column primary keys can also be used). **DELETE operations are unsupported on tables without a primary key.**
* Distributed [XA transactions](https://mariadb.com/kb/en/xa-transactions) are not supported.
* [AUTO_INCREMENT](https://galeracluster.com/library/kb/auto-increment-multiples.html) automatically uses the number of nodes in a Galera cluster as an increment. It means that it's not possible to rely on that the next auto-generated value will be max(x)+1.
* Other details about limitations and behavior of MariaDB Galera clusters and MaxScale load balancers are available on [MariaDB Galera Cluster - Known Limitations](https://mariadb.com/kb/en/mariadb-galera-cluster-known-limitations) and [Limitations and Known Issues within MariaDB MaxScale](https://mariadb.com/kb/en/mariadb-maxscale-25-limitations-and-known-issues-within-mariadb-maxscale).
