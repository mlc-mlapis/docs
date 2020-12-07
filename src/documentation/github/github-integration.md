# Connecting a Zerops Service to a GitHub Repository

Every [runtime service](/documentation/services/runtimes.html) has the option to connect with a GitHub repository to automatically trigger the [build pipeline](/documentation/build/how-zerops-build-works.html) defined in [zerops.yml](/documentation/build/build-config.html) inside your project source code root. The pipeline can be triggered either by a new tag or push to a particular branch of your project. The GitHub integration requires an additional GitHub permission and works by creating a [GitHub webhook](https://developer.github.com/webhooks/).

![GitHub Connection](/github-connection.png "GitHub connnection")

### Connecting a repository / stoping automatic build afterwards

You can connect a repository or stop the automatic build from the "Builds & deploys" tab inside your service detail. The webhook can be also removed on the GitHub side by going to your repository settings.

![GitHub Connection settings](/github-connection-setting.png "GitHub connnection settings")
