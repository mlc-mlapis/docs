# Export & import of Zerops projects and services structure

The concept of Zerops export and import functionality can be explained in the example of two primary areas where you can use it effectively.

1. Obtaining a simple skeleton of an existing project or its services, created step by step in the Zerops GUI and using it to automate the creation of the same project/services or creating a new copy of them. The skeleton doesn't contain any application data, only the structure and configuration setting. **It's ready for daily use.**

2. Ability to create more sophisticated skeletons and use them to simulate different project scenarios, testing and validation, including a fully prepared skeleton to re-create Zerops projects from the ground on one click or as a part of other automation scripts. **It is not available yet.** However, it is possible to perceive it as the target where Zerops is heading in this area.

## How to get exports

You can find several places in the Zerops GUI to get them. For the whole project, it's primarily the project main menu, as shown on the following picture.

![Zerops exports](./images/Project-Export.png "Zerops project export")

For each project service, it's a similar service menu as shown below.

![Zerops exports](./images/Service-Export.png "Zerops service export")

## Used format and how it looks

Zerops uses a YAML definition format to describe the structures. If you make a project export, you can get something similar to the following. You can see two main parts, `project` and `services`. If you export a service separately, only the `services` part is there and one service.

```yaml
project:
  name: copy of iKBase Class
  description: Intelligent Knowledge Base
  tags:
  - DEMO
  - ZEROPS
services:
- hostname: golang
  type: go@1
  mode: NON_HA
  ports:
  - port: 8088
  - httpSupport: true
  startCommand: ./bin/main.exe
- hostname: phpapache
  type: php-apache@8.0
  mode: NON_HA
  documentRoot: /var/www/public
- hostname: objectstorage
  type: object-storage@1
  mode: HA
  objectStorageDiskGBytes: 2
- hostname: sharedstorage
  type: shared-storage@1
  mode: HA
```

## Available syntax

**Project keywords**:

`name`

Existed project name, pre-pended by a prefix of `copy of` to differentiate it.

`description` (optional)

Project description, if entered.

`tags` (optional)

Project tags, if entered.

**Service keywords**:

`hostname`

A chosen short and descriptive URL-friendly unique service name. Related to [MariaDB](/documentation/services/databases/mariadb.html#hostname-and-port), [MongoDB](/documentation/services/databases/mongodb.html#hostname-and-port), [Node.js](/documentation/services/runtimes/nodejs.html#port), [Golang](/documentation/services/runtimes/golang.html#port), [PHP](/documentation/services/runtimes/php.html#hostname-and-port), [Object Storage](/documentation/services/storage/s3.html#object-storage-name), and [Shared Storage](/documentation/services/storage/shared.html#shared-storage-name).

`type`

Service type and chosen version. Related to [MariaDB](/documentation/services/databases/mariadb.html#version-to-choose), [MongoDB](/documentation/services/databases/mongodb.html#version-to-choose), [Node.js](/documentation/services/runtimes/nodejs.html#version-to-choose), [Golang](/documentation/services/runtimes/golang.html#version-to-choose), [PHP](/documentation/services/runtimes/php.html#version-to-choose), [Object Storage](/documentation/services/storage/s3.html#version-to-choose), and [Shared Storage](/documentation/services/storage/shared.html#version-to-choose).
