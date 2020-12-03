# How to access, update and add variables to your services

Services define their own environment variables that are then available
inside a service. Service has access to environment variables from other services
inside the same project prefixed by their name. For example if we want
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

Environment variables are managed inside `Service Variables` panel. Content of the environment
variables could be either a reference to variable defined on the same service, or even on
a different service inside the same project. Resulting
environment variable will be translated from the reference. Using example
defined above if we define value of the service environment variable
`${mariadb_connectionString}` resulting environment variable value would be
translated to the `connectionString` value defined on the `mariadb` service.

Environment variable name should match regular expression  below.

```
[a-zA-Z_]+[a-zA-Z0-9_]*
```

Content of the environment variable should consist of ASCII characters only without new line at the
end.
