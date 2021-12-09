# PostgreSQL Service in HA Mode, Internal

The following picture shows a simplified schema of a standalone [Zerops MariaDB Service](/documentation/services/databases/mariadb.html) in HA mode (with a default of 3 database instances in a [Galera cluster](https://mariadb.com/kb/en/galera-cluster)) without external access. This means no access from outside of the Zerops project infrastructure, such as the Internet. There is only native access through a private network using a [default port](/documentation/services/databases/mariadb.html#hostname-and-port) **==3306==** from the [Zerops Project Core Service](/documentation/overview/how-zerops-works-inside/typical-schemas-of-zerops-projects.html) itself, which is the heart of each user-defined Zerops project.

## Simplified schema (no external access)

![Zerops PostgreSQL Service](./images/Zerops-PostgreSQL-Service-Base.png "Zerops PostgreSQL Service")

## Extended schema (no external access)

![Zerops PostgreSQL Service](./images/Zerops-PostgreSQL-Service-Detail.png "Zerops PostgreSQL Service")