# Connecting Zerops to a GitHub repository

While creating a [runtime service]() you have an option connect the service with a GitHub repository to automatically trigger the [build pipeline]() defined in [zerops.yml]() inside your project root. The pipeline can be triggered either upon either a new tag or push to a particular branch of your project. GitHub integration requires additional GitHub permission and works by creating a [GitHub webhook](https://developer.github.com/webhooks/).

![GitHub Connection](/github-connection.png "GitHub connnection")

### Connecting repository / stoping automatic build afterwads

You can connect a repository or stop the automatic build from the "Builds & deploys" tab inside your service detail. Webhook can be also removed on GitHub side by going to your repository settings.

![GitHub Connection settings](/github-connection-setting.png "GitHub connnection settings")
