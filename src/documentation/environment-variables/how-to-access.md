# How to Access, Update, and Add Variables to Your Services

Services define their own environment variables that are then available
inside a service. Each service has access to environment variables of other services
inside the same project prefixed by their name. For example, if we want
to access environment variable called `connectionString` defined on `mariadb` service
from another service we would reference that variable using `mariadb_connectionString` key.


![service variables](/service-variables.png "service variables")


<br/>

### Variables by technology

Service environment variables are available via environment variables inside runtime services.

- PHP — `$_ENV['key']`
- Node.js — `process.env.key`
- Golang — `os.LookupEnv('key')`


### Creating user defined variables

Environment variables can be managed inside the `Service Variables` panel. The content of the environment
variables could be either a reference to a variable defined on the same service or to a variable defined on
a different service inside the same project. The resulting
environment variable will be translated from the reference. Using the example
defined above, if we define the value of the service environment variable
`${mariadb_connectionString}`, the resulting environment variable value would be
translated to the `connectionString` value defined on the `mariadb` service.

The environment variable name should match the regular expression  below.

```
[a-zA-Z_]+[a-zA-Z0-9_]*
```

The content of the environment variable should consist of ASCII characters only without a new line at the
end.
