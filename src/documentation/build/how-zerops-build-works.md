# How Zerops Build Works

By adding [`zerops.yml`](/documentation/build/build-config.html) to your application source code (we look for it at the root), you let Zerops know what steps to [`run`](/documentation/build/build-config.html#run) to build your application runtime, which technology to [`use`](/documentation/build/build-config.html#uses) and which files to [`deploy`](/documentation/build/build-config.html#deploy).

Build can be triggered either by using a [CLI](/documentation/cli/installation-authorization.html) or by connecting a Zerops service to a [GitHub repository](/documentation/github/github-integration.html) or a [GitLab repository](/documentation/gitlab/gitlab-integration.html).

Internally, Zerops creates a new temporal build service inside your project, runs the defined commands and uses [deploy](/documentation/deploy/how-deploy-works.html) to deploy the result to your runtime service. Running build (and its [log](/documentation/zerops-logs/build-logs.html)) can be monitored inside of our application.

Build service has access to the project's [environment variables](/documentation/environment-variables/how-to-access.html), so you can utilize them.

### Example

- Runtime Service — [nginx static](/documentation/services/static-server.html) (to serve static files)
- Application source code to build and [deploy](/documentation/deploy/how-deploy-works.html) - Angular (using nodejs and npm)

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


See the full [zerops.yml documentation](/documentation/build/build-config.html).
