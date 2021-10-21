# Export & import of Zerops projects and services structure

Zerops export and import functionality can be used to make a copy of an existing project/service or as an alternative way to adding a new project/service manually through the Zerops GUI. It is important to note that only structure, configuration, and environment variables are exported/imported. Restoring application data related to databases ([MariaDB](/documentation/services/databases/mariadb.html#how-to-backup-restore-database-data), MongoDB, Redis), storage ([Object Storage](/documentation/services/storage/s3.html#using-rclone-as-a-local-management-tool), Shared Storage), and engines (Elasticsearch, RabbitMQ),  deploying applications, and setting up [public routing](/documentation/routing/using-your-domain.html) is up to a user.

[[TOC]]

## How to export / import a project

You can find several places in the Zerops GUI where you can do it. The primary one for export is the main project menu, as shown in the following picture. The project is exported including all of its services.

![Zerops exports](./images/Project-Export.png "Zerops project export")

You can import the whole project, including all its services, on the same page you use for creating a new project manually.

![Zerops imports](./images/Project-Import.png "Zerops project import")

## How to export / import a service

The right place to export a project service is its service menu, as shown below.

![Zerops exports](./images/Service-Export.png "Zerops service export")

Importing a project service can be done again in the project menu, as shown in the [picture at the top](#how-to-export-import-a-project).

## Used YAML specification

Zerops uses a YAML definition format to describe the structures. If you make a project export, you can get something similar to the following. You can see two main parts, `project` and `services`. If you export a service separately, only the `services` part is there with that one exported service.

```yaml
project:
  name: Example
  tags:
  - DEMO
  - ZEROPS
services:
- hostname: app
  type: nodejs@14
  mode: HA
  ports:
  - port: 3000
    httpSupport: true
  - port: 9090
    protocol: UDP
    httpSupport: false
  envVariables:
  - key: jwt_token_secret
    content: M3rW31Ne%T@bRk
  - key: CONNECTION_STRING
    content: ${db_connectionString}
  startCommand: npm start
- hostname: db
  type: mariadb@10.4
  mode: HA
- hostname: sharedstorage
  type: shared-storage@1
  mode: NON_HA
```

### project

**`project`**

A project structure uses `name`, `description`, and `tags` items.

#### name

`name`: string

A project name. When exported, it's pre-pended by a prefix of `copy of` to differentiate it.

#### description

`description`: string (optional)

A project description, if entered.

#### tags

`tags`: Array[string] (optional)

A sequence of project tags, if entered. Each of them on a separate line with the opening dash.

### services

**`services`**

A sequence of project services (1~N). Several general items are shared across all service structures, and exception ones are used only in some.

#### hostname

`hostname`: string

A chosen short and descriptive URL-friendly unique service name. Related to [MariaDB](/documentation/services/databases/mariadb.html#hostname-and-port), [MongoDB](/documentation/services/databases/mongodb.html#hostname-and-port), Redis, [Node.js](/documentation/services/runtimes/nodejs.html#port), [Golang](/documentation/services/runtimes/golang.html#port), [PHP](/documentation/services/runtimes/php.html#hostname-and-port), Elasticsearch, RabbitMQ, [Object Storage](/documentation/services/storage/s3.html#object-storage-name), and [Shared Storage](/documentation/services/storage/shared.html#shared-storage-name).

#### type

`type`: dictionary

A service type and its chosen version. Each of the following service documentation specifies the available options: [MariaDB](/documentation/services/databases/mariadb.html#version-to-choose), [MongoDB](/documentation/services/databases/mongodb.html#version-to-choose), Redis, [Node.js](/documentation/services/runtimes/nodejs.html#version-to-choose), [Golang](/documentation/services/runtimes/golang.html#version-to-choose), [PHP](/documentation/services/runtimes/php.html#version-to-choose), Elasticsearch, RabbitMQ, [Object Storage](/documentation/services/storage/s3.html#version-to-choose), and [Shared Storage](/documentation/services/storage/shared.html#version-to-choose).

#### mode

`mode`: dictionary

Affects whether a service should be run in ==**`HA`**== (High Availability) mode, using 3 or more containers, or ==**`NON_HA`**== mode, using only 1 container. Related to [MariaDB](/documentation/services/databases/mariadb.html#ha-non-ha-database-mode), MongoDB, Redis, [Node.js](/documentation/services/runtimes/nodejs.html#ha-non-ha-runtime-environment-mode), [Golang](/documentation/services/runtimes/golang.html#ha-non-ha-runtime-environment-mode)), [PHP](/documentation/services/runtimes/php.html#ha-non-ha-runtime-environment-mode), Elasticsearch, RabbitMQ, [Object Storage](/documentation/services/storage/s3.html#used-technology) (**always runs only in HA mode**) , and [Shared Storage](/documentation/services/storage/shared.html#default-hardware-configuration-and-autoscaling).

#### ports

`ports`: Array[ServicePort] (optional)

A sequence of service ports (1~N). Each one contains `port`, `protocol`, and `httpSupport` items.

Related only to [Node.js](/documentation/services/runtimes/nodejs.html#port) and [Golang](/documentation/services/runtimes/golang.html#port) runtime environment services, where you can set or change it. **You have to enter one port at least.** The rest of the services have the ports preset, and you can't change them. That's the reason why this part is not included at their level, and if entered, it's ignored.

##### port

`port`: integer

A chosen port number.

##### protocol

`protocol`: dictionary (optional)

A chosen protocol. The default value is the ==`TCP`== and it does not have to be entered. The other possible option is the ==`UDP`== value.

##### httpSupport

`httpSupport`: boolean (optional)

The default value ==`true`== indicates if a web server runs on the port (HTTP application protocol is supported), otherwise value ==`false`== is used. If enabled, it means that you can even map [public Internet domains](/documentation/routing/using-your-domain.html#using-your-domain-to-access-a-service) with the option of automatic support for SSL certificates (it also works for [Zerops subdomains](/documentation/routing/zerops-subdomain.html#zerops-subdomain-for-previews)).

#### envVariables

`envVariables`: Array[EnvironmentVariable] (optional)

A sequence of [service environment variables](/documentation/environment-variables/how-to-access.html) (0~N). Each one contains `key` and `content` items.

##### key

`key`: string

An environment variable key.

##### content

`content`: string

An environment variable content.

#### documentRoot

`documentRoot`: string (optional)

It's related only to the [PHP/Apache](/documentation/services/runtimes/php.html#setting-php-apache-document-root) service. The value represents a folder name used as the root of the publicly accessible web server content, usually the location of your `index.php`. The document root is set to the `public` name when you create the service manually in the Zerops GUI. **When used with the import functionality, you have to enter a value.**

#### nginxConfig

`nginxConfig`: string (optional)

It's related only to the [PHP/Nginx](/documentation/services/runtimes/php.html#default-nginx-config)) service. The value represents the required content of the configuration `nginx.conf` file used by the Nginx server. The part of that configuration is also setting the value of a document root. **When used with the import functionality, you have to enter also the same or your customized config.**

For example, this could be the exported value if a user would accept the default setting when creating the service in the Zerops GUI.

```yaml
services:
  - hostname: phpnginx
    type: php-nginx@8.0
    mode: NON_HA
    nginxConfig: |
      server {
        listen 80;
        listen [::]:80;
        
        server_name _;
        # Be sure that you set up a correct document root!
        root /var/www/public;
        
        location / {
          try_files $uri /index.php$is_args$args;
        }
        
        location ~* \.php$ {
          fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
          fastcgi_split_path_info ^(.+\.php)(/.*)$;
          include fastcgi_params;
          fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
          fastcgi_param DOCUMENT_ROOT $realpath_root;
          internal;
        }
        
        access_log syslog:server=unix:/dev/log,facility=kern default_short;
        error_log syslog:server=unix:/dev/log,facility=kern;
      }
```

#### startCommand

`startCommand`: string

A command that should start your service. It will be triggered after each deployment or after you manually start or re-start it.

Related only to [Node.js](/documentation/services/runtimes/nodejs.html#start-command) and [Golang](/documentation/services/runtimes/golang.html#start-command) runtime environment services, where you can specify it.

#### objectStorageDiskGBytes

`objectStorageDiskGBytes`: integer (optional)

It's related only to the [Object Storage](/documentation/services/storage/s3.html#required-disk-capacity) service. The value represents the required maximum amount of data in GB the Object Storage Service should be capable of holding. **When used with the import functionality, you have to enter a value.** The preset value, when working in the Zerops GUI, is ==`2`== GB.

#### buildFromGit

`buildFromGit`: string (optional)

A public Git URL of a repository should be cloned by Zerops and used for building such a service, including the branch name. It allows fully automatic processing of the same steps as a user can manually do in the Zerops GUI (including selecting the `Build immediately after the service creation` checkbox). **There is a strict condition for using it. The repository has to be a public one.**

The format of the URL should be: `https://<domain>@<branchName>`

Related only to [Node.js](/documentation/services/runtimes/nodejs.html#how-to-deploy-application-code), [Golang](/documentation/services/runtimes/golang.html#how-to-deploy-application-code), and [PHP](/documentation/services/runtimes/php.html#how-to-deploy-application-code) runtime environment services.

## Secure access through VPN

Can use the [Zerops VPN](/documentation/cli/vpn.html) and securely access such a service through URL `http://<hostname>:<port>` inside your Zerops project network.

## Current known limitations

1. It's not possible use private repositories in combination with the `buildFromGit` item. If you want to import a service related to a private repository, you have to connect it manually in the Zerops GUI.

2. You have to configure your [domains](/documentation/routing/using-your-domain.html), or [Zerops subdomains](/documentation/routing/zerops-subdomain.html) access directly in the Zerops GUI.

3. When using shared storage services, neither the export nor the import is able to process the [storage mounting points](/documentation/services/storage/shared.html#storage-mounting) in relation to [Node.js](/documentation/services/runtimes/nodejs.html#accessing-a-zerops-shared-storage), [Golang](/documentation/services/runtimes/golang.html#accessing-a-zerops-shared-storage), and [PHP](/documentation/services/runtimes/php.html#accessing-a-zerops-shared-storage) runtime environment services.

4. When importing several services, they are created parallelly and asynchronously, without the explicit order. You can't affect which one will be instantiated as the first and which as the last.

## Zerops recipes

The concept of pre-prepared skeletons demonstrates the way how to set up and use technologies Zerops is supporting. They are using the import syntax to allow very fast creation of services utilizing such technologies.

Here are some of them:

* [recipe-adminer](https://github.com/zeropsio/recipe-adminer)

Adminer is a full-featured database management tool written in PHP. Conversely to phpMyAdmin, it consist of a single file ready to deploy to the target server. Adminer is available for MySQL, MariaDB, PostgreSQL, SQLite, MS SQL, Oracle, Elasticsearch, MongoDB and others via plugin.
