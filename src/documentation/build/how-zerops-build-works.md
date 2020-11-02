# How Zerops Build Works

By adding `zerops.yml` to you project's root, you let Zerops know what steps to `run` to build your application, which technology to `use` and which files to `deploy`.

Build can be triggered either by using our [CLI]() or by connecting a service to a [GitHub repository]().

Internally, Zerops creates a new temporal build container inside your project, runs the defined commands and uses [deploy]() to deploy the result to your runtime container. Running build (and its log) can be monitored inside of our [application]().

Build container has access to the project's [environment variables](), so you can utilize them.

### Example

- Runtime Service — [nginx static]() (to serve stack files)
- Application to build and [deploy]() - Angular (using nodejs and npm)

```yaml
# select what technology your build uses
use: [ nodejs@13 ]
# which commands to run to build
run:
  - npm i
  - npm run build:production
# which files / folders to deploy after build
deploy: [ dist, node_modules, package.json ]
```


See full [zerops.yaml documentation]().
