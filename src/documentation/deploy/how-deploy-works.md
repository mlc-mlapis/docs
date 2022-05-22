# How Zerops Deploy Works

<!-- markdownlint-disable DOCSMD004 -->
::: tip ZEROPS CAN BUILD AND DEPLOY FOR YOU
While it's certainly possible for you to deploy to Zerops, we recommend you run your [builds](/documentation/build/how-zerops-build-works.html) on Zerops as well. Build can be triggered by connecting the service with a GitHub or GitLab repository or by using the `push` command of our CLI.
:::
<!-- markdownlint-enable DOCSMD004 -->

Deploy is triggered automatically at the end of the [Zerops build pipeline](/documentation/build/build-config.html#run), but you can invoke it manually, too, by using the `deploy` command in the Zerops [zCLI](/documentation/cli/available-commands.html#deploy-project-name-service-name-space-separated-files-or-directories). In such a case, [zerops.yml](/documentation/build/build-config.html#run-part-and-its-properties) has to be also added to your application source code (Zerops looks for it in the root directory) if it's not there already.

The following example for the Node.js service below shows that only the [run](/documentation/build/build-config.html#run-part-and-its-properties) section is required. The [build](/documentation/build/build-config.html#build-part-and-its-properties) section is related exclusively to the build pipeline, and it's omitted.

```yaml
nodejs:
  run:
    prepare:
      - <command>
    init:
      - <command>
    envReplace:
      target: [<file>]
      delimiter: [<delimiter>]
    start: npm start
```

 The [start](/documentation/build/build-config.html#start-required-only-for-node-js-or-golang-services) property is required only for the Node.js or Golang services, and [documentRoot](/documentation/build/build-config.html#documentroot-required-only-for-php-apache-service) is only needed for the PHP/Apache service.

<!-- markdownlint-disable DOCSMD004 -->
::: tip The deployment process fully supports using both prepare and init commands
Both [prepare](/documentation/build/build-config.html#prepare-optional-for-all-services) and [init](/documentation/build/build-config.html#init-optional-for-all-services) commands are fully supported by the same way as through the build process. Also the [envReplace](/documentation/build/build-config.html#envreplace-optional-for-all-services) functionality can be used.
:::
<!-- markdownlint-enable DOCSMD004 -->

Each deployed application is then saved and you can switch freely between any of the previously deployed versions.

Zerops takes care of the __no-shutdown__ deploy process by creating a new version of application. After that, Zerops starts switching incoming requests to the new version and shutting and removing the old one.

## Example of the `deploy` command

- deploy from [GitHub Actions](/documentation/deploy/use-in-github-actions.html)
- deploy from [GitLab CI/CD](/documentation/deploy/use-in-gitlab-ci.html)
