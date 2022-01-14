# Automatically Generated Helper Variables


Zerops automatically adds a number of utility variables, for both internal and your own
use. They cannot be deleted, their keys cannot be changed and those marked with 🔒 cannot have their value edited.


**See variable by service type:**

[[toc]]

### Node.js, Golang

#### `hostname`
🔒 Service hostname.

#### `zeropsSubdomain`
🔒 Unique subdomain of zerops.io, i.e. `my-app-30001.app.zerops.io`, this variable is always available, but subdomain access has to be enabled inside the service routing settings.

#### `startCommand`
Command used for running the user defined application which corresponds to the command filled when creating a service.

###  PHP+Nginx

#### `hostname`
🔒 Service hostname.

#### `zeropsSubdomain`
🔒 Unique subdomain of zerops.io, i.e. `my-app-30001.app.zerops.io`, this variable is always available, but subdomain access has to be enabled inside the service routing settings.

#### `nginxConfig`
🔒 Content of the server configuration located in most cases at `/etc/nginx/sites-available` used to define how the request should be handled by the php runtime.

#### `documentRoot`
Folder from which php scripts should be executed. Deployed files are unpacked at `/var/www`.


###  PHP+Apache

#### `hostname`
🔒 Service hostname.

#### `zeropsSubdomain`
🔒 Unique subdomain of zerops.io, ie `my-app-30001.app.zerops.io`, this variable is always available, but subdomain access has to be enabled inside the service routing settings.

#### `documentRoot`
Folder from which php scripts should be executed. Deployed files are unpacked at `/var/www`.


### MariaDB

#### `port`
🔒 Port on which the database server runs.

#### `hostname`
🔒 Service hostname.

#### `connectionString`
🔒 Connection string.

#### `user`
Database admin username (changing it won't affect the value in the database settings, that needs to be updated manually, see [VPN](/documentation/cli/vpn.html)).

#### `password`
Database admin password (changing it won't affect the value in the database settings, that needs to be updated manually, see [VPN](/documentation/cli/vpn.html)).

### PostgresQL

#### `port`
🔒 Port on which the database server runs in non-HA mode and also the port on which the current database primary server runs in HA cluster mode, and which has to be used to create a connection through which all data modification requests (SQL statements INSERT, UPDATE, DELETE) must be sent.

#### `portReplicas`
🔒 It can be used to create a connection through which only data reading requests (SQL statement SELECT) should be sent in HA cluster mode (any cluster member can process such requests).

#### `hostname`
🔒 Service hostname.

#### `connectionString`
🔒 Connection string in non-HA mode and also the connection string in HA cluster mode to create a connection through which all data modification requests (SQL statements INSERT, UPDATE, DELETE) must be sent (only the current primary member processes such requests).

#### `connectionStringReplicas`
🔒 Connection string in HA cluster mode to create a connection through which only data reading requests (SQL statement SELECT) should be sent (any cluster member can process such requests).

#### `user`
Database admin username (changing it won't affect the value in database settings, that needs to be updated manually, see [VPN](/documentation/cli/vpn.html)).

#### `password`
Database admin password (changing it won't affect the value in database settings, that needs to be updated manually, see [VPN](/documentation/cli/vpn.html)).


### Elasticsearch

#### `port`
🔒 Port on which the database server runs.

#### `hostname`
🔒 Service hostname.

#### `connectionString`
🔒 Connection string.


### Nginx Static

#### `hostname`
🔒 Service hostname.

#### `nginxConfig`
🔒 Content of the server configuration located in most cases at `/etc/nginx/sites-available` used to define how the request should be handled by the php runtime.


### MongoDB

#### `port`
🔒 Port on which the database server runs.

#### `hostname`
🔒 Service hostname.

#### `connectionString`
🔒 Connection string.


### Redis

#### `port`
🔒 Port on which the database server runs.

#### `hostname`
🔒 Service hostname.

#### `connectionString`
🔒 Connection string.


### RabbitMQ

#### `port`
🔒 Port on which the database server runs.

#### `hostname`
🔒 Service hostname.

#### `connectionString`
🔒 Connection string.

#### `managementPort`
🔒 Port to the RabbitMQ management service.


### Object Storage

#### `apiUrl`
🔒 URL used to access the S3 compliant storage object API.

#### `accessKeyId`
🔒 Access key to grant permission to use the object storage.

#### `secretAccessKey`
🔒 Secret key to grant permission to use the object storage.

#### `quotaGBytes`
🔒 Upper bound for the maximum storage consumption.
