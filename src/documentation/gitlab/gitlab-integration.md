# Connecting Zerops to a GitLab Repository

While creating a [runtime service](/documentation/services/runtimes.html), you have the option to connect the service to a GitLab repository to automatically trigger the [build pipeline](/documentation/build/how-zerops-build-works.html) defined in [zerops.yml](/documentation/build/build-config.html) inside your project root. The pipeline can be triggered either by a new tag or push to a particular branch of your project. The GitLab integration requires an additional GitLab permission and works by creating a [GitLab webhook](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html).

![GitLab Connection](/gitlab-connection.png "GitLab connnection")

### Connecting a repository / stoping automatic build afterwards

You can connect a repository or stop the automatic build from the "Builds & deploys" tab inside your service detail. The webhook can be also removed on the GitLab side by going to your repository settings.

![GitHGitLabub Connection settings](/gitlab-connection-setting.png "GitLab connnection settings")
