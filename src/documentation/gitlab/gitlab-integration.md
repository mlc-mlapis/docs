# Connecting Zerops to a GitLab repository

While creating a [runtime service]() you have an option connect the service with a GitLab repository to automatically trigger the [build pipeline]() defined in [zerops.yml]() inside your project root. The pipeline can be triggered either upon either a new tag or push to a particular branch of your project. GitLab integration requires additional GitLab permission and works by creating a [GitLab webhook](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html).

![GitLab Connection](/gitlab-connection.png "GitLab connnection")

### Connecting repository / stoping automatic build afterwads

You can connect a repository or stop the automatic build from the "Builds & deploys" tab inside your service detail. Webhook can be also removed on GitLab side by going to your repository settings.

![GitHGitLabub Connection settings](/gitlab-connection-setting.png "GitLab connnection settings")
