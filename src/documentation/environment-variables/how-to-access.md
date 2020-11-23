# How to access, update and add variables to your services

Services define their own service variables that are then available
inside a container. Service has access to environment variables from other services
inside the same project prefixed by their hostnames. For example if we want
to access environment variable called `connectionString` defined on `mariadb`
in another service we would reference that variable using `mariadb_connectionString` key.


![service variables](/service-variables.png "service variables")


<br/>

### Variables by technology

Service variables are available via environment variables inside runtime stacks. Other stacks cannot
use these variables at the moment to configure themselves.

- PHP — `$_ENV['key']`
- Node.js — `process.env.key`
- Golang — `os.LookupEnv('key')`


### Creating user defined variables

Variables are created inside `Service Variables` panel. Content of the environment
variables could be either a reference to variable defined on the same service, or even on
a different service inside the same project another stack. Resulting
environment variable will be translated from the reference. Using example
defined above if we define value of the service variable
`${mariadb_connectionString}` resulting environment variable value would be
expanded to the `connectionString` value defined on the `mariadbprod` service.

Key should match regex below.

```
[a-zA-Z_]+[a-zA-Z0-9_]*
```

Content of the value should consist of ASCII characters only without newline at the
end.
