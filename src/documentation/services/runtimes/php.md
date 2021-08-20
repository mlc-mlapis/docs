# PHP

Zerops provides a fully managed and scaled PHP runtime service, suitable for both development and production projects using any load. You can choose any option you want and be sure that it will work. Your certainty and peace of mind are our top priority.

[[toc]]

## Adding the PHP Service in Zerops

### Version to choose

You can currently choose PHP version **v8.0**, **v7.4**, or **v7.3**. The chosen version of it **can't be changed afterward**. The service is always combined with a web server. It can be either **Apache v2.4** or **Nginx v1.18**. Differences and configuration specifics to each web server are listed below.

### Hostname and port

Choose a short and descriptive URL-friendly name, for example, **app**. The following rules apply:

* maximum length **==25==** characters,
* only lowercase ASCII letters **==a-z==** and numbers **==0-9==**,
* **==has to be unique==** in relation to other existing project's hostnames,
* the hostname **==can't be changed==** later.

The port will automatically be set to the value of **==80==** and can't be changed.

<!-- markdownlint-disable DOCSMD004 -->
::: info Changing version
Switching must be done manually by creating a new service with another version and migrating service code using a new [deploy](/documentation/deploy/how-deploy-works.html) or [build & deploy](/documentation/build/how-zerops-build-works.html) process.
:::
<!-- markdownlint-enable DOCSMD004 -->

### Application code root and document root

The application code you deploy will always be placed in the ==**/var/www**== **code root** folder. You can choose a **document root** (the publicly accessible folder, usually the location of your ==index.php==). By default, the document root is set to the folder ==**/var/www/public**== , which you can change.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Recommendation
Using a subdirectory like ==**/var/www/public**== for a document root is always a good idea. This allows you to use service code root level for overhead stuff and improve the readability of the directory structure so.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### Setting PHP/Apache document root

You set it through a separate input.

![PHP+Apache](./images/PHP-Apache-Document-Root.png "Document root")

Later change of the **document root** you can do through editing of the **`documentRoot`** environment variable.

#### Setting PHP/Nginx document root

You set it through a service Nginx configuration file at the following part. More on how this config looks and means, see the section [Default Nginx config](#default-nginx-config).

```nginx
# Be sure that you set up a correct document root!
root /var/www/public;
```

Later change of the **document root** you can do through a separate **Nginx configuration** service card.

### Default Nginx config

![PHP+Nginx](./images/PHP-Nginx-Document-Root.png "Document root")

* You can change the default config (with the pre-defined content specific for each PHP engine version) as you want if you respect correct syntax and valid paths with one exception. **==Don't modify port 80==** at the marked point <span style="background-color: #ff8080">&nbsp;[**1**]&nbsp;</span>. Otherwise, you will break the project.

* Defined separated **document root** as a subdirectory like **public** `/var/www/public` (optional name) or keeping it identical with the service **code root** `/var/www` at the marked point <span style="background-color: #ffff00">&nbsp;[**2**]&nbsp;</span>.

* Which file (`index.php` here) at the marked point <span style="background-color: #00ff40">&nbsp;[**3**]&nbsp;</span> is used for serving a **document root content**.

* The location defined at the marked point <span style="background-color: #00ffff">&nbsp;[**4**]&nbsp;</span> blocks access to any `*.php` file for external requests (case insensitive) using the directive **internal** at the marked point <span style="background-color: #00ffff">&nbsp;[**5**]&nbsp;</span>. Any try to access leads to a **404 Not Found** response then. If you would like to allow external access to `*.php` files in a subdirectory, for example, the `uploads`, you need to add a new location:

```nginx
location ^~ /uploads/ {
   fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
   fastcgi_split_path_info ^(.+\.php)(/.*)$;
   include fastcgi_params;

   fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
   fastcgi_param DOCUMENT_ROOT $realpath_root;
}
```

* Ensure that used **storage log paths** at the marked point <span style="background-color: #8000ff; color: white">&nbsp;[**6**]&nbsp;</span> for **access_log** and **error_log** are correct.

### HA / non-HA runtime environment mode

When creating a new service, you can choose whether the runtime environment should be run in **HA** (High Availability) mode, using 3 or more containers, or **non-HA mode**, using only 1 container. ==**The chosen runtime environment mode can't be changed later.**== If you would like to learn more about the technical details and how this service is internally built, take a look at the [PHP Service in HA Mode, Internal](/documentation/overview/how-zerops-works-inside/php-cluster-internally.html).

#### PHP runtime in non-HA mode

* great for local development to save money,
* doesn’t require any changes to the existing code,
* not necessary to respect HA mode [specifics](#what-you-should-remember-when-using-the-ha-mode), but see the recommendation tip below,
* not recommended for production projects.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Recommendation
Even when using the non-HA mode for a production project, we nonetheless recommend you respect all of the [HA mode specifics](#what-you-should-remember-when-using-the-ha-mode) because you never know when you'll need to switch to the HA mode.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### PHP runtime in HA mode

* will start to run on three containers, each on a **different physical machine**,
* with increasing operating load, the number of containers can reach up to 64,
* so the application runs redundantly in 3 or more places, with no risk of total failure,
* when one container fails, it's automatically replaced with a new one,
* the need to respect all of the [specifics](#what-you-should-remember-when-using-the-ha-mode) related to a PHP cluster,
* recommended for production projects.

### How to deploy application code

You have **two ways** how you can deliver application code to the service. Either a direct connection to a [GitHub](/documentation/github/github-integration.html) or [GitLab](/documentation/gitlab/gitlab-integration.html) repository or using the Zerops **zcli** [push](/documentation/cli/available-commands.html#push-project-name-service-name) or [deploy](/documentation/cli/available-commands.html#deploy-project-name-service-name-space-separated-files-or-directories) commands.

When a Zerops service has been connected to a GitHub or GitLab repository, you have to make a **new commit/tag** to invoke the first [build & deploy](http://localhost:8081/documentation/build/how-zerops-build-works.html) pipeline task.

![Service connected to a Repository](./images/Repository-Triggering-Tag-Commit.png "Repository triggering on a Tag/Commit")

<!-- markdownlint-disable DOCSMD004 -->
::: info Simple projects and how to deploy them using the Zerops zcli
You can look at the two step-by-step described real projects, **Adminer** and **phpMyAdmin** web tools, used to administer the Zerops MariaDB (MySQL) databases. How to create and deploy them with the Zerops **zcli**.

* [Preparing and deploying phpMyAdmin application kit](/knowledge-base/how-to-do/how-to-prepare-phpmyadmin-application-kit.html)
* [Preparing and deploying Adminer application kit](/knowledge-base/how-to-do/how-to-prepare-adminer-application-kit.html)
:::
<!-- markdownlint-enable DOCSMD004 -->

## Accessing a Zerops S3 Object Storage



## Accessing a Zerops Shared Storage

When a Zerops PHP Service is created, you can mount a **Zerops Shared Storage Service** to it. If you don't have any of such yet, create a new one. You can then **enable** the switch on the right service card (here only ==`app`== Zerops Service) that you want to connect to the storage. When it already exists, go to its **Storage configuration card** and do the same change.

The path to the root is ==`/mnt/app`== , then. Here, you can create any directory structure you need. Because PHP code runs under the **`www-data`** user account, any saved file has `-rw-r--r-- www-data www-data` permissions and created directories `drwxr-xr-x www-data www-data`.

The **`zeropsSharedStorageMounts`** environment variable allows you to get the list of mounted shared storage services (separated by a pipe, if there are more than only one). For more flexibility, it's always recommended to use such environment variables indirectly, as shown in an example of [custom environment variables](/knowledge-base/best-practices/how-to-use-environment-variables-efficiently.html), in each project service separately.

![Shared Storage](./images/Mount-Shared-Storage.png "Mount a Shared Storage")

## How to access a PHP runtime environment

<!-- markdownlint-disable DOCSMD004 -->
::: warning Don't use additional security protocols for internal communication
The runtime environment service is not configured to support direct access using SSL/TLS or SSH protocols for internal communication inside a Zerops project private secured network. This is also the case for access using the Zerops [zcli](/documentation/cli/installation.html) through a secure VPN channel.
:::
<!-- markdownlint-enable DOCSMD004 -->

### From other services inside the project

Other services can access the PHP application using its **hostname** and **port**, as they are part of the same private project network.

It's always recommended not to place configuration values as constants directly into the application code. The better way is to use them indirectly, for example, via [custom environment variables](/knowledge-base/best-practices/how-to-use-environment-variables-efficiently.html), referencing Zerops [implicit environment variables](/documentation/environment-variables/helper-variables.htm) and given that [all environment variables](/documentation/environment-variables/how-to-access.html) are shared within the project across all services.

### From local development environment

You can access the Zerops PHP Service from your local workspace by using the [VPN](/documentation/cli/vpn.html) functionality of our [Zerops zcli](/documentation/cli/installation.html). This might be handy if you, for example, use the service as a REST API and you don’t want it publicly available (via [public domains](/documentation/routing/using-your-domain.html) or Zerops [subdomains](/documentation/routing/zerops-subdomain.html)), so you connect to the project using **zcli VPN** and use ==`app:80`== as your API endpoint.

You can also run an application fully in your local workspace and access other services in the Zerops project using the VPN. However, you cannot use references to the environment variables because you are outside of the project's network. Therefore, you should copy the values manually if you need some of them and use them in your private local configuration strategy.

## Default hardware configuration and autoscaling

* Each PHP container (1 in non-HA, 3 in HA) starts with 1 vCPU, 0.25 GB RAM, and 5 GB of disk space.
* Zerops will automatically scale the resources vertically (both in non-HA and HA mode up to 32 vCPU, 128 GB RAM, 1 TB disk space) and horizontally (HA mode only up to 64 containers).

## Pre-installed PHP Composer

[Composer](https://getcomposer.org) **v2.1.5**, as a dependency manager for PHP, is globally pre-installed in each Zerops PHP Service. You can run it by adding the line of ==`composer install`== to the **run** section in the [zerops.yml](/documentation/build/build-config.html) configuration file. It supposes that you have a **`composer.json`** file placed in the root directory of application code that defines what should be installed.

## Pre-installed PHP modules and extensions

Zerops PHP service includes the most used PHP extensions by default. If you need to use another one, not on the list, let us know through a new issue on the Zerops.io [GitHub Documentation Repository](https://github.com/zeropsio/docs) or send us an e-mail at [dev@zerops.io](mailto:dev@zerops.io).

|Module / Extension                                             |Module / Extension                                           |Module / Extension                                             |Module / Extension                                           |Module / Extension                                           |
|:--------------------------------------------------------------|:------------------------------------------------------------|:--------------------------------------------------------------|:------------------------------------------------------------|:------------------------------------------------------------|
|[calendar](https://www.php.net/manual/en/book.calendar.php)    |[gettext](https://www.php.net/manual/en/book.gettext.php)    |[pcntl](https://www.php.net/manual/en/book.pcntl.php)          |[session](https://www.php.net/manual/en/book.session.php)    |[tidy](https://www.php.net/manual/en/book.tidy.php)          |
|[bcmath](https://www.php.net/manual/en/book.bc.php)            |[hash](https://www.php.net/manual/en/book.hash.php)          |[pcre](https://www.php.net/manual/en/book.pcre.php)            |[shmop](https://www.php.net/manual/en/ref.shmop.php)         |[mysqli](https://www.php.net/manual/en/book.mysqli.php)      |
|[Core](https://www.php.net/manual/en/extensions.membership.php)|[iconv](https://www.php.net/manual/en/book.iconv.php)        |[PDO](https://www.php.net/manual/en/book.pdo.php)              |[ftp](https://www.php.net/manual/en/book.ftp.php)            |[tokenizer](https://www.php.net/manual/en/book.tokenizer.php)|
|[ctype](https://www.php.net/manual/en/intro.ctype.php)         |[igbinary](https://github.com/igbinary/igbinary)             |[pdo_mysql](https://www.php.net/manual/en/ref.pdo-mysql.php)   |[SimpleXML](https://www.php.net/manual/en/book.simplexml.php)|[xml](https://www.php.net/manual/en/book.xml.php)            |
|[curl](https://www.php.net/manual/en/book.curl.php)            |[imagick](https://www.php.net/manual/en/book.imagick.php)    |[pdo_pgsql](https://www.php.net/manual/en/ref.pdo-pgsql.php)   |[sockets](https://www.php.net/manual/en/book.sockets.php)    |[xmlreader](https://www.php.net/manual/en/book.xmlreader.php)|
|[date](https://www.php.net/manual/en/book.datetime.php)        |[intl](https://www.php.net/manual/en/book.intl.php)          |[pdo_sqlite](https://www.php.net/manual/en/ref.pdo-sqlite.php) |[sodium](https://www.php.net/manual/en/book.sodium.php)      |[xmlwriter](https://www.php.net/manual/en/book.xmlwriter.php)|
|[dom](https://www.php.net/manual/en/book.dom.php)              |[json](https://www.php.net/manual/en/book.json.php)          |[pgsql](https://www.php.net/manual/en/book.pgsql.php)          |[SPL](https://www.php.net/manual/en/book.spl.php)            |[xsl](https://www.php.net/manual/en/book.xsl.php)            |
|[exif](https://www.php.net/manual/en/book.exif.php)            |[libxml](https://www.php.net/manual/en/book.libxml.php)      |[Phar](https://www.php.net/manual/en/book.phar.php)            |[sqlite3](https://www.php.net/manual/en/book.sqlite3.php)    |[Zend OPcache](https://pecl.php.net/package/ZendOpcache)     |
|[FFI](https://www.php.net/manual/en/book.ffi.php)              |[mbstring](https://www.php.net/manual/en/book.mbstring.php)  |[posix](https://www.php.net/manual/en/book.posix.php)          |[standard](https://www.php.net/manual/en/book.spl.php)       |[zip](https://www.php.net/manual/en/book.zip.php)            |
|[fileinfo](https://www.php.net/manual/en/book.fileinfo.php)    |[mongodb](https://www.php.net/manual/en/set.mongodb.php)     |[readline](https://www.php.net/manual/en/book.readline.php)    |[sysvmsg](https://www.php.net/manual/en/sem.installation.php)|[zlib](https://www.php.net/manual/en/book.zlib.php)          |
|[filter](https://www.php.net/manual/en/book.filter.php)        |[mysqlnd](https://www.php.net/manual/en/book.mysqlnd.php)    |[redis](https://github.com/phpredis/phpredis)                  |[sysvsem](https://www.php.net/manual/en/sem.installation.php)|                                                             |
|[gd](https://www.php.net/manual/en/book.image.php)             |[openssl](https://www.php.net/manual/en/book.openssl.php)    |[Reflection](https://www.php.net/manual/en/book.reflection.php)|[sysvshm](https://www.php.net/manual/en/sem.installation.php)|                                                             |

## How to customize php.ini setting from application code

To overwrite current `php.ini` settings, it's necessary to create a new `PHP_INI_SCAN_DIR` [environment variable](/documentation/environment-variables/how-to-access.html). As its value, you have to enter a full path to a directory located in application code scanned by the system for all files ending in `.ini` in alphabetical order, where you can place any directive and its value.

You can also use the path **`:`** separator to define the relative order to the pre-defined `php.ini` [configuration](https://www.php.net/manual/en/configuration.file.php). Placing it at the beginning means that `.ini` files coming from application code will overwrite the existed `php.ini` settings. Placing it at the end means the reversed logic. Pre-defined `php.ini` configuration will overwrite `.ini` files from application code.

![Settings php.ini](./images/Env-Var-PHP_INI_SCAN_DIR.png "Environment variable PHP_INI_SCAN_DIR")

The recommendation is to create a directory ==`php.d`== in the [code root](#code-root-and-document-root) (always in `/var/www`) and place all custom `*.ini` files there.

Generally, you have several options for how to customize PHP configuration settings. The list of `php.ini` [directives](https://www.php.net/manual/en/ini.list.php) also contains a column with `Changeable` header that shows [modes determining](https://www.php.net/manual/en/configuration.changes.modes.php) when and where a directive may be set. Directives with `PHP_INI_USER`, `PHP_INI_PERDIR`, or `PHP_INI_ALL` mode can be easily controlled from application code. But directives marked with `PHP_INI_SYSTEM` can be set only through `php.ini` configuration to which you don't have direct access.

<!-- markdownlint-disable DOCSMD004 -->
::: info 
To see the current `php.ini` configuration, use the `phpinfo()` function.
:::
<!-- markdownlint-enable DOCSMD004 -->

### A real example of `PHP_INI_SCAN_DIR` using

If you want to block a file upload possibility at a service level, you need to set ==`file_uploads = Off`== directive. Do the following steps to get it:

1. Create the `php.d` subdirectory in your code root.

2. Place a `changes_php.ini` file into that subdirectory with the content:

```php
; Whether to allow HTTP file uploads (http://php.net/file-uploads)
file_uploads = Off
```

<!-- markdownlint-disable MD029 -->
3. Deploy your changed code to the service.

4. Create a new service environment variable `PHP_INI_SCAN_DIR` with the value ==`:/var/www/php.d`== .

5. Restart the PHP service.

6. Check the current status using the `phpinfo()` function. There should be the `file_uploads` directive set to `Off` value (in **Core** module section).
<!-- markdownlint-enable MD029 -->

## Logging

Both access and error logs are configured using a syslog service to centralize all records and allowing live access through a **Runtime log** tab inside your service detail for each Zerops service container.

![Runtime log](./images/Runtime-Log.png "Runtime log access")

Default **Apache** configuration is done through `/etc/apache2/sites-enabled/vhost.conf`, and you don't have direct edit access to its content. **You can't change it**.

```shell
ErrorLog  "| /usr/bin/logger -thttpd -plocal6.err"
CustomLog "| /usr/bin/logger -thttpd -plocal6.notice" combined
```

Default **Nginx** configuration is done through `/etc/nginx/sites-enabled/default.site`, and you have direct edit access to its content through the [Nginx configuration](#default-nginx-config) section. **You can change it**, but be careful what you are doing.

```shell
access_log syslog:server=unix:/dev/log,facility=kern default_short;
error_log syslog:server=unix:/dev/log,facility=kern;
```

You can use PHP ==`error_log`== directive to pass any application runtime error,

```php
error_log("Application is running in the read-only mode.");
```

and see it in the **Runtime log** tab later.

![Runtime log](./images/Runtime-Log-PHP-Error.png "Runtime log PHP error")

## How to detect HTTPS sessions

Zerops Routing Service (see the schema of a Zerops project with [external access](/documentation/overview/how-zerops-works-inside/typical-schemas-of-zerops-projects.html#with-external-access)) takes care of SSL certificate management and internal translation of HTTPS protocol to HTTP for all project's services.

Your application logic may need to check or do something when a client is accessing it using HTTPS protocol (user's requests are encrypted). In such a case, it's possible to inspect the **`HTTP_X_FORWARDED_PROTO`** header.

```php
if (
   isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
   strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https'
) {
   // Here, you know that HTTPS protocol is used.
}
```

## What you should remember when using the HA mode

### Locally stored data only for a temporary purpose

You should not store your permanent data or sessions in the local disk space of containers running your application.
The reason is that locally stored data is reserved only for this particular container instance, not mirrored across the PHP cluster nor backup-ed. It will not be migrated if such a container is deleted due to its failure. If it is necessary to store and share such data permanently, we recommend developers should preferably utilize [Zerops Shared Storage](/documentation/services/storage/shared.html) or [Zerops S3 compatible Object Storage](/documentation/services/storage/s3.html) services.

## Known specifics

* Configuration through the **.htaccess** file is supported only on Apache-based services.
* Default `php.ini` resource limitations (for example, **max_execution_time**, **max_input_time**, **memory_limit**, **post_max_size**, **upload_max_size**, …) can be changed through a [PHP_INI_SCAN_DIR](#how-to-customize-php-ini-setting-from-a-user-s-service-code) environment variable and `*.ini` files in user's code.
* Default value of [error_reporting](https://www.php.net/manual/en/errorfunc.configuration.php#ini.error-reporting) directive has been set to **E_ALL** (except **E_DEPRECATED** and **E_STRICT**) and can be changed through a [PHP_INI_SCAN_DIR](#how-to-customize-php-ini-setting-from-a-user-s-service-code) environment variable again.
* The following functions have been disabled on the Zerops environment for security reasons through **disable_functions** directive by default in `php.ini`:

|Function        |Function          |Function                |Function           |
|:---------------|:-----------------|:-----------------------|:------------------|
|pcntl_alarm     |pcntl_wifsignaled |pcntl_signal_get_handler|pcntl_sigtimedwait |
|pcntl_fork      |pcntl_wifcontinued|pcntl_signal_dispatch   |pcntl_exec         |
|pcntl_waitpid   |pcntl_wexitstatus |pcntl_get_last_error    |pcntl_getpriority  |
|pcntl_wait      |pcntl_wtermsig    |pcntl_strerror          |pcntl_setpriority  |
|pcntl_wifexited |pcntl_wstopsig    |pcntl_sigprocmask       |pcntl_async_signals|
|pcntl_wifstopped|pcntl_signal      |pcntl_sigwaitinfo       |                   |
