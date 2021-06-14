# Databases

## MariaDB (MySQL)

<!-- markdownlint-disable DOCSMD004 -->
::: details Compatibility & Differences to MySQL
Information on the compatibility of MariaDB software with similar, competing software, as well as their differences, can be found [here](https://mariadb.com/kb/en/compatibility-differences).
:::
<!-- markdownlint-enable DOCSMD004 -->

### Adding MariaDB service in Zerops

#### Version to choose

You can actually choose **v10.4** or **v10.3**. The chosen version of the database **can't be changed afterward**, and switching has to be done manually by creating a new service with another version and migrating data. We, however, plan to implement service cloning, allowing you safe migration so that this limitation will be removed soon.

#### Hostname and port

Choose a short and descriptive URL-friendly name, for example, **db**. The port will automatically be set to the value of **==3306==** and can't be changed.

#### HA / non-HA database mode

When creating a new service, you can choose whether the database should be run in **HA** (High Availability) mode, using 3 containers, or **non-HA mode**, using only 1 container. To help you to decide, look at the [Choosing the right database mode](#choosing-right-database-mode) section below. The chosen database mode can't be changed later. We, however, plan to implement service cloning, allowing you safe migration.

### Choosing the right database mode

<!-- markdownlint-disable DOCSMD004 -->
::: warning Volatile non-database storage
Each container has a separate disk space, which can theoretically be used by appropriate APIs of the database service and thus store data outside the replicated contents of the database. It should be noted that such data is considered volatile (reserved for this particular instance only). It will not be migrated if such a container is deleted due to a failure of this container. If it is necessary to store and share such data at the database level permanently, developers should use Zerops object storage or shared storage services. Also, separate direct access to an individual MariaDB instance is not supported in any way.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### Database in non-HA mode

* great for local development to save money,
* it doesn’t require any changes to the existed code,
* runs on a single container, higher risk of data loss,
* not recommended for production projects.

#### Database in HA mode

* will run on three containers as a [Galera cluster](https://mariadb.com/kb/en/galera-cluster),
* with two load balancers ([MaxScale](https://mariadb.com/kb/en/maxscale)) in [readwritesplit](https://mariadb.com/kb/en/mariadb-maxscale-25-readwritesplit) mode,
* recommended for production projects.
  
#### HA quirks

##### Make your apps work with HA databases

<!-- markdownlint-disable DOCSMD004 -->
::: tip Asynchronous behavior of MariaDB HA cluster
When data is stored in a MariaDB cluster (through its actual primary database instance), it is replicated across other replica instances asynchronously. This means that if one SQL statement stores some data, the next immediate statement may not retrieve the same data. The reason is that the given statement will be executed against another replica instance. If required to get the same data, it's necessary to encapsulate both commands into a single SQL transaction, which will always be executed against the primary instance.

You can also force synchronization waits for causality checks on a cluster by [wsrep_sync_wait](https://mariadb.com/docs/reference/mdb/system-variables/wsrep_sync_wait) bitmask. Enabling it ensures that certain types of queries always execute against the most up to date database state, at the expense of query performance.
:::
<!-- markdownlint-enable DOCSMD004 -->

### Default hardware configuration and autoscaling

* Each MariaDB container (1 in non-HA, 3 in HA) and each load balancer container will start with 1 vCPU, 0.25 GB RAM, and 0.5 GB of disk space.
* Zerops will automatically scale the database only [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (both of non-HA and HA).
* The [horizontal autoscaling](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) in HA mode is not applied because of the optimal performance.
* Each container runs on a **different physical machine**.

### How to connect to MariaDB database

#### From other services inside the project

Other services can access the database using its **hostname** and **port**, as they are part of the same private project network, but it’s highly recommended to utilize the **==connectionString==** environment variable that Zerops creates automatically for each database, especially when using HA mode, as it makes sure to include all the info required for HA, more info in the dedicated [environment variables](/documentation/environment-variables/how-to-access.html) section, related to **connectionString**. See also a list of all automatically generated [variables](/documentation/environment-variables/helper-variables.html#mariadb) for MariaDB service.

#### From local development environment

To connect to the database from your local workspace, you can utilize the [VPN](/documentation/cli/vpn.html) functionality of our [CLI](/documentation/cli/installation.html). This allows you to access the database the same way as other services inside the project, but you can not use references to the environment variables, unlike other services. Therefore you should copy the values manually through the „**How To Access** / **Database access details**“ section of the service detail in your application.

![MariaDB Service](/services/MariaDB/Database-Access-Details.png "Database Access Details")

### Default MariaDB user and password

Zerops automatically creates the root access when creating the service, where the **==user==** is based on the selected **hostname**, and the **==password==** is randomly generated. These are saved to environment variables **user** and **password** and can be referenced from other services the same way as **connectionString**.

<!-- markdownlint-disable DOCSMD004 -->
::: warning Zerops doesn’t keep both places in sync
If you change your password inside the MariaDB database directly, the change is not reflected in the environment variable and vice versa. It’s up to you to keep these up to date through the „**Service env. Variables**“ section of the service detail in your application.

![MariaDB Service](/services/MariaDB/Database-Access-Change-Password.png "Database Access Change Password")
:::

### How to Dump / Restore database data

#### Using mysql CLI

First, connect to the database service using [zcli](/documentation/cli/installation.html).

##### Logical database dump

```powershell
mysqldump -u root -p[root_password] -x [database_name] > filename.dump
```

##### Logical database restore

```powershell
mysql -u root -p[root_password] [database_name] < filename.dump
```

#### Using Adminer / phpMyAdmin

Create a new [PHP service](/documentation/services/runtimes.html#php) and upload the PHP script file. You can access the MariaDB database service by its connection string or its hostname, port, user, and password.

#### Using your favorite database management tool

First, connect to the database using [zcli](/documentation/cli/installation.html). You can use a connection string of MariaDB service inside your tool then.

### MariaDB service limitations

* Only InnoDB storage engine is supported.
* No support for explicit locks, including LOCK TABLES, FLUSH TABLES {explicit table list} WITH READ LOCK, GET_LOCK, RELEASE_LOCK, etc. **These problems can be avoided by using transactions.** Global locking operators like FLUSH TABLES WITH READ LOCK are supported.
* All database tables should have a primary key (multi-column primary keys can also be used). **DELETE operations are unsupported on tables without a primary key.**
* Distributed [XA transactions](https://mariadb.com/kb/en/xa-transactions) are not supported.
* [AUTO_INCREMENT](https://galeracluster.com/library/kb/auto-increment-multiples.html) automatically uses the number of nodes in a Galera cluster as an increment. It means that it's not possible to rely on that the next auto-generated value will be max(x)+1.
* Other details about limitations and behavior of MariaDB Galera clusters and MaxScale load balancers are available on [MariaDB Galera Cluster - Known Limitations](https://mariadb.com/kb/en/mariadb-galera-cluster-known-limitations) and [Limitations and Known Issues within MariaDB MaxScale](https://mariadb.com/kb/en/mariadb-maxscale-25-limitations-and-known-issues-within-mariadb-maxscale).

# ***********************
### Adding a new MariaDB service

The following presentation shows you how to do it in Zerops UI step by step.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Keyboard shortcuts for viewing
For faster navigation through any presentation, you can use the shortcuts below.
|← Previous|→ Next|↓ Down|↑ Up|F: Full-screen|ESC: Overview|
|:--------:|:----:|:----:|:--:|:------------:|:-----------:|
:::

@slidestart simple

Click the button **Add the First Service** <br />
or **Add a New Service**

![MariaDB Service](/services/Add-New-Service.png "Add a New Service")

---

Choose **MariaDB** card from the services catalog

![MariaDB Service](/services/New-Service-MariaDB-Category.png "Select MariaDB")

---

Choose **MariaDB version** which you want to use

![MariaDB Service](/services/New-Service-MariaDB-Version.png "Select MariaDB version")

---

<span class="r-fit-text">
Choose <b>MariaDB service hostname</b> which you want to use. <br /><br />
Use this hostname and the internal port, i.e., <b>mariadb:3306</b>, <br /> for access from other project services.
</span>

![MariaDB Service](/services/New-Service-MariaDB-Hostname.png "Select MariaDB service hostname")

---

<span class="r-fit-text">
Zerops **MariaDB service** is actually configured always in **HA mode** [1].<br />
Unfortunately, you can't change it, but this limitation will be removed soon.
</span>

![MariaDB Service](/services/New-Service-MariaDB-HA.png "MariaDB service HA")

<span class="r-fit-text">
Clicking on the button <b>Add a new MariaDB</b> [2] starts the process.
</span>

---

<span class="r-fit-text">
Clicking on the <b>MariaDB</b> [1] tag inside the <b>Services</b> card <br />
and then on the symbol of a running process [2], <br />
you see the instantiation of the service.
</span>

![MariaDB Service](/services/New-Service-MariaDB-Instantiating.png "MariaDB service instantiating")

---

<span class="r-fit-text">
You can switch to the row layout [1]. Show <b>Database access details</b> [2],<br />
readable password [3], and pay attention to Connection String [4].
</span>

![MariaDB Service](/services/New-Service-MariaDB-Access.png "MariaDB service access details")

@slideend

### Using a connection string from other services

As shown in the previous presentation, after creating a new MariaDB service, there are database access details (hostname, port, user, password, connection string) that you can use in other Zerops services. You can use them because all services have access to [environment variables](/documentation/environment-variables/how-to-access.html) of other services inside the same project prefixed by their name. For **MariaDB** there are automatically generated [helper variables](/documentation/environment-variables/helper-variables.html#mariadb).

#### Example for Node.js® runtime

The global **process** object is always available to applications without using **require()**.

```TypeScript
const dbServiceName = 'mariadb';
const env = process.env;
const dbConnectionString = env.`${dbServiceName}_connectionString`;
const dbHost = env.`${dbServiceName}_hostname`;
const dbPort = env.`${dbServiceName}_port`;
const dbUser = env.`${dbServiceName}_user`;
const dbPassword = env.`${dbServiceName}_password`;
```

The value of **dbConnectionString** variable is **user:password@mariadb:3306** then. When using Node.js® driver **mysql**, it's possible to use this value directly to establish a connection.

```TypeScript
const mysql = require('mysql');
const dbName = 'db';
const connection = mysql.createConnection(`mysql://${dbConnectionString}/${dbName}`);
```

You can certainly also use more structured syntax with an object.

```TypeScript
const mysql = require('mysql');
const dbName = 'db';
const connection = mysql.createConnection({
  host: ${dbHost},
  port: ${dbPort},
  user: ${dbUser},
  password: ${dbPassword},
  database : ${dbName}
});
```

### The following documentation part will be restructured and moved to other places

The following image shows a simplified schema of a standalone Zerops MariaDB Service in HA mode (with a default of 3 database instances in a cluster) without external access. This means no access from outside of Zerops project infrastructure, such as the Internet. There is only native access through a private network using a default port 3306 from the Zerops Project Basic Service itself, representing the core of a user-defined project inside Zerops.

![Zerops MariaDB Service](./images/Zerops-MariaDB-Service-Base.png "Zerops MariaDB Service")

Zerops Project Core Service is the heart of each Zerops project. It has its own [pricing logic](/documentation/overview/pricing.html#projects). The essential parts are two running instances of a **project balancer** (one in an active state and the other in a standby backup state) through which all communication is passing (either related to the project's external environment or the private network). This ensures a high degree of reliability and stability for all traffic at any time. Each of them runs in a different container located on a **different physical machine**. An independent **activity controller** continuously monitors critical operating parameters of both project balancers. If the currently active instance shows any abnormalities, the running standby backup gets activated instead. From an external perspective, this change is not noticeable in any way.

Zerops MariaDB Service shares the [same pricing structure](/documentation/overview/pricing.html#services) with other Zerops services. Once again, two instances of a **[load balancer (MaxScale)](https://mariadb.com/kb/en/maxscale)** (both in the active state) play a crucial role and control the routing of data reading requests in tandem. They always direct the requests to the least busy instance of the MariaDB database service (or to the primary one in case of data writing requests). An independent **scaling controller** monitors and controls [vertical scaling](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (vCPU, RAM, Disk) for all load balancer and MariaDB database containers. To ensure optimal performance, the MariaDB cluster is always configured and run with 3 database instances, and [horizontal scaling](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) (number of containers) doesn't play any role in this case. An independent **repair controller** is then responsible for removing any containers that exhibit abnormal behavior and subsequently replacing them with new ones.

Both load balancers or MariaDB service containers are located on **different physical computers** to prevent service outages in the event of any fatal failure on a single physical computer.

Below, you can see the same schema as before, this time including all relations among internal parts. You can also see details regarding project core controllers. The **statistics one** is used for storing metrics of operational parameters of all project and service containers, and the **logger one** for recording all events. The legend can help you orient yourself.

![Zerops MariaDB Service](./images/Zerops-MariaDB-Service-Detail.png "Zerops MariaDB Service")

<!-- markdownlint-disable DOCSMD004 -->
::: details Primary & Replica MariaDB instances
There is always only one primary instance with write access. This is to minimize the risk of data drift and errant transactions. If the primary instance has failed for any reason, the replication mechanism will activate a new one using one of the available replica instances.
:::
<!-- markdownlint-enable DOCSMD004 -->

## MongoDB

## Redis
