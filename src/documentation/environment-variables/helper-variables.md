# Automatically generated helper variables

Zerops automatically adds number of utility variables, for both internal and your
use. They cannot be deleted, their keys cannot be changed and those marked with 🔒 cannot have their value edited.

### Node.js, Golang

#### `hostname`
🔒 Service hostname.

#### `zeropsSubdomain`
🔒 Unique subdomain of zerops.dev, ie `my-app-30001.app.zerops.dev`, this variables is always available, but subdomain access has to actually be enabled inside service routing settings.

#### `startCommand`
Command used for running the user defined application which coresponds to the command filled when creating the stack.

###  PHP+Nginx

#### `hostname`
🔒 Service hostname.

#### `zeropsSubdomain`
🔒 Unique subdomain of zerops.dev, ie `my-app-30001.app.zerops.dev`, this variables is always available, but subdomain access has to actually be enabled inside service routing settings

#### `nginxConfig`
🔒 Content of the server configuration located in most cases at `/etc/nginx/sites-available` used to define how the request should be handled by the php runtime.

#### `documentRoot`
Folder from which php scripts should be executed. Deployed files are unpacked at `/var/www`.


###  PHP+Apache

#### `hostname`
🔒 Service hostname.

#### `zeropsSubdomain`
🔒 Unique subdomain of zerops.dev, ie `my-app-30001.app.zerops.dev`, this variables is always available, but subdomain access has to actually be enabled inside service routing settings

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
Database admin username.

#### `password`
Database admin password.


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

#### `api_url`
🔒 URL used to access the S3 compliant storage object API.


#### `access_key`
🔒 Access key to grant permission of using the object storage.

#### `secret`
🔒 Secret key to grant permission of using the object storage.

#### `quotaGBytes`
🔒 Upper bound for the maximum storage consumption.
