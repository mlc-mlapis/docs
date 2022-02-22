# How to Access, Update, and Add Variables to Your Services

Services define their own environment variables which are available within a service at any given time. Each service has access to other services' environment variables within the same project prefixed by their name. For example, if we want to access the environment variable called `connectionString` defined on `mariadb` service from another service, we would reference that variable using `mariadb_connectionString` key.

![service variables](/service-variables.png "service variables")

## Variables by technology

Service environment variables are available via environment variables inside runtime services.

- PHP — `getenv("key")`
- Node.js — `process.env.key`
- Golang — `os.LookupEnv('key')`

<!-- markdownlint-disable DOCSMD004 -->
::: info The default value of the [variables_order] PHP directive
The [variables_order](https://www.php.net/manual/en/ini.core.php#ini.variables-order) directive is set by default to the value of ==`GPCS`== in the `php.ini` for Zerops PHP services. It means that the super-global variable `$_ENV` is not populated.
:::
<!-- markdownlint-enable DOCSMD004 -->

## Creating user defined variables

Environment variables can be managed inside the `Service Variables` panel. The content of the environment variables could either be a reference to a variable defined in the same service or to a variable defined in a different service within the same project. The resulting environment variable will be translated from the reference. Using the example defined above, if we define the value of the service environment variable `${mariadb_connectionString}`, the resulting environment variable value would be translated to the `connectionString` value defined in the `mariadb` service.

The environment variable name should match the regular expression below.

```bash
[a-zA-Z_]+[a-zA-Z0-9_]*
```

The content of the environment variable should only consist of ASCII characters without a new line at the end.
