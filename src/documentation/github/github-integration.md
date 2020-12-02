# Connecting Zerops service with a GitHub repository

Every [runtime service](/documentation/services/runtimes.html) has an option to connect with a GitHub repository to automatically trigger the [build pipeline](/documentation/build/how-zerops-build-works.html) defined in [zerops.yml](/documentation/build/build-config.html) inside your project source code root. The pipeline can be triggered either upon either a new tag or push to a particular branch of your project. GitHub integration requires additional GitHub permission and works by creating a [GitHub webhook](https://developer.github.com/webhooks/).

![GitHub Connection](/github-connection.png "GitHub connnection")

### Connecting repository / stoping automatic build afterwads

You can connect a repository or stop the automatic build from the "Builds & deploys" tab inside your service detail. Webhook can be also removed on GitHub side by going to your repository settings.

![GitHub Connection settings](/github-connection-setting.png "GitHub connnection settings")
