# How Zerops Deploy Works

::: tip ZEROPS CAN BUILD AND DEPLOY FOR YOU

While it's certainly possible for you to deploy to Zerops, we recommend you run your [builds]() on Zerops as well. You can trigger build from your CI tools just as you would deploy the artifacts.
:::

<br />

Deploy is triggered automatically at the end of the [Zerops build pipeline]() but you can trigger it manually too by using the `deploy` command in our [CLI]().

Each deployed package is then saved to an object storage and you can freely switch between any of the previously deployed packages.

Zerops takes care of the __no-shutdown__ deploy process by creating a new container with your new package. Only then it starts switching balacing to the new container, eventually shutting and removing the old one.

#### Example of the `deploy` command:

- deploy from [local]()
- deploy from [GitHub Actions]()
- deploy from [GitLab CI/CD]()
- deploy from [CircleCI]()
