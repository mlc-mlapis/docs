# How Zerops Build Works

Adding [zerops.yml](/documentation/build/build-config.html) to your application source code (Zerops looks for it at the **root directory**), lets Zerops know which [base](/documentation/build/build-config.html#uses) technology should be used, and which steps to run during the application [build](/documentation/build/build-config.html#run) phase to produce a final application runtime. The [deploy](/documentation/build/build-config.html#deploy) part specifies which files will be copied to a runtime service container(s) when the build is successfully done.

<!-- markdownlint-disable DOCSMD004 -->
::: info Applications in monorepo environment
Each `zerops.yml` can contain definitions for one or more applications. It is especially valuable for a monorepo when one repository contains source code for many applications. The appropriate service hostname to which the application will be deployed is used to select a correct definition from the `zerops.yml`.
:::
<!-- markdownlint-enable DOCSMD004 -->

Internally, Zerops creates a new temporal build container inside your project that does not affect the existing running application in any way. Every step of the ongoing build process (and its [log](/documentation/zerops-logs/build-logs.html)) can be monitored within the Zerops GUI.

The same [zerops.yml](/documentation/build/build-config.html) file is also used to define steps that Zerops has to invoke to [run](/documentation/build/build-config.html#run) the application runtime after a successful deployment.

A new build can be triggered by using the Zerops [zcli](/documentation/cli/installation-authorization.html) or connecting a Zerops service to a [GitHub](/documentation/github/github-integration.html) / [GitLab](/documentation/gitlab/gitlab-integration.html) repository.

The build process has access to all [environment variables](/documentation/environment-variables/how-to-access.html) of the project's services so that you can utilize them.

## Examples

### Node.js (using Npm)

```yaml
# Service hostname to which the application will be deployed.
nodejsapp:
  build:
    # What technology should be used as a base one for creating a build container.
    base: [nodejs@14]
    # What commands should be run to build the application.
    build:
      - npm i
      - npm run build:production
    # What files and directories should be copied from a build container into a runtime container.
    deploy: [dist, node_modules, package.json]
  run:
    # A command that should start your service.
    start: npm start
```

### Golang

```yaml
# Service hostname to which the application will be deployed.
goapp:
  build:
    # What technology should be used as a base one for creating a build container.
    base: [go@1]
    # What commands should be run to build the application.
    build:
      - go build -o ./bin/server ./app/server.go
    # What files and directories should be copied from a build container into a runtime container.
    deploy: [./bin/server]
  run:
    # A command that should start your service.
    start: ./bin/server
```

### PHP (using Composer)

```yaml
# Service hostname to which the application will be deployed.
phpapp:
  build:
    # What container type should be used as a base one for creating a build container.
    base: [php@8.0]
    build:
      # What tasks should be run to build the application.
      - composer install
    # What files and directories should be copied from a build container into a runtime container.
    deploy: ['vendor', 'public']
  run:
    # Folder name used as the root of the publicly accessible web server content.
    documentRoot: public
```

See the full [zerops.yml](/documentation/build/build-config.html) documentation.
