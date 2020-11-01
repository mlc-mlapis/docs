# How Zerops build works

By adding `zerops.yml` to you project's root, you let zerops know what steps to `run` to build your application and using what technology to `use` and which files it should `deploy`.

Build can be triggered either using our [CLI]() or by connecting a service to a [github repository]().

Internally Zerops creates a new temporal build container inside your project, runs the defined commands and uses [deploy]() to deploy the result to your runtime container. Running build (and its log) can be monitored inside our [application]().

### Example

Service — nginx
Application - Angular

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
