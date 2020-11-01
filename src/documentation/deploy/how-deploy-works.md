# How Zerops deploy works

::: tip ZEROPS CAN BUILD AND DEPLOY FOR YOU

While you certainly can only deploy to Zerops, it's preferable you run your [builds]() on Zerops as well. You can trigger build from your CI tools just as you would deploy the artifacts.
:::

<br />

Deploy is trigger automatically at the end of [zerops build pipeline](), but you can trigger it directly by using the `deploy` command of our [CLI]().

Each deployed package is then saved to an object storage and you can freely switch between any of the previously deployed packages.

Zerops takes care of __no-shutdown__ deploy process by creating a new container with your new package and only then starts switching balacing to the new container eventually shutting and removing the old one.

#### Example of `deploy` command:

- deploy from [local]()
- deploy from [GitHub Actions]()
- deploy from [GitLab CI/CD]()
- deploy from [CircleCI]()
