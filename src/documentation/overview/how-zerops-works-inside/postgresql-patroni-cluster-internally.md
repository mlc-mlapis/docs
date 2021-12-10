# PostgreSQL Service in HA Mode, Internal

The following picture shows a simplified schema of a standalone [Zerops PostgreSQL Service](/documentation/services/databases/postgresql.html) in HA mode (with a default of 3 database instances in a [Patroni cluster](https://patroni.readthedocs.io)) without external access. This means no access from outside of the Zerops project infrastructure, such as the Internet. There is only native access through a private network using a [default ports](/documentation/services/databases/postgresql.html#hostname-and-ports) **==5432==** or **==5433==** from the [Zerops Project Core Service](/documentation/overview/how-zerops-works-inside/typical-schemas-of-zerops-projects.html) itself, which is the heart of each user-defined Zerops project.

## Simplified schema (no external access)

![Zerops PostgreSQL Service](./images/Zerops-PostgreSQL-Service-Base.png "Zerops PostgreSQL Service")

## Extended schema (no external access)

![Zerops PostgreSQL Service](./images/Zerops-PostgreSQL-Service-Detail.png "Zerops PostgreSQL Service")