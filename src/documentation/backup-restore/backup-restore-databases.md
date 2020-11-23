# Backup and restore of databases

You can securely access your database service using [VPN](/documentation/cli/vpn.html) built into our [CLI](/documentation/cli/installation-authorization.html). You can then use any of the tools provided by the database vendor, such as [`mongorestore`](https://docs.mongodb.com/manual/reference/program/mongorestore/), [`mongodump`](https://docs.mongodb.com/manual/reference/program/mongodump/), or the [`mysql`](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) command.

This can be used to dump data for use in local running database or when migrating away from Zerops. And also to initially restore data to Zerops.

Otherwise Zerops uses [snapshot backup and restore](/documentation/backup-restore/snapshot-backup.html) to safely backup your data for you.

Full docs about dumping and restoring data can be found in [services/databases](https://dev.mysql.com/doc/refman/8.0/en/mysql.html) sections of this documentation.

::: tip USE VPN TO USE ZEROPS DB SERVICE AS DEV DATABASE
Running datases locally, especially if you need to simulate [high availability mode](/documentation/ha/why-should-i-want-high-availability.html), running on multiple containers, is hard. Create a clone of your project, and use Zerops [VPN](/documentation/cli/vpn.html) to connect to the project and use the database locally.
:::
