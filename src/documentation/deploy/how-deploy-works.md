# How Zerops Deploy Works

::: tip ZEROPS CAN BUILD AND DEPLOY FOR YOU

While it's certainly possible for you to deploy to Zerops, we recommend you run your [builds](/documentation/build/how-zerops-build-works.html) on Zerops as well. 
:::

<br />

Deploy is triggered automatically at the end of the [Zerops build pipeline](/documentation/build/build-config.html#run) but you can trigger it manually too by using the `deploy` command in zerops [zcli](/documentation/cli/available-commands.html#deploy-project-name-service-name-files-or-paths).

Each deployed application is then saved and you can freely switch between any of the previously deployed versions.

Zerops takes care of the __no-shutdown__ deploy process by creating a new version of application. After that zerops starts switching incoming requests to the new version and shutting and removing the old one.

#### Example of the `deploy` command:

- deploy from [GitHub Actions](/documentation/deploy/use-in-github-actions.html)
- deploy from [GitLab CI/CD](/documentation/deploy/use-in-gitlab-ci.html)
