# Databases

## MariaDB (MySQL)

<!-- markdownlint-disable DOCSMD004 -->
::: details Compatibility & Differences to MySQL
Information on the compatibility of MariaDB software with similar, competing software, as well as the differences, can be found [here](https://mariadb.com/kb/en/compatibility-differences).
:::
<!-- markdownlint-enable DOCSMD004 -->

The following image shows a simplified schema of a standalone Zerops MariaDB Service in HA mode with no access from the external environment. It means access from outside of Zerops project infrastructure, like access from the Internet. There is only native access through default port 3306 from the Zerops Project Basic Service itself, representing the core of a user-defined project inside Zerops.

![Zerops MariaDB Service](./images/Zerops-MariaDB-Service-Base.png "Zerops MariaDB Service")

Zerops Project Basic Service is the hearth of each Zerops project. It has its own [pricing logic](/documentation/overview/pricing.html#projects). Zerops MariaDB Service shares the [same price structure](/documentation/overview/pricing.html#services) with other Zerops services.

![Zerops MariaDB Service](./images/Zerops-MariaDB-Service-Detail.png "Zerops MariaDB Service")

## MongoDB

## Redis

## Elasticsearch

## RabbitMQ
