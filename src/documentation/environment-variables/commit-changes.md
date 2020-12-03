# Commit changes and restart to apply

Changes to environment variables are not applied directly but has to be commited first and then the affected services have to be manually **restarted for them to apply**. Commited environment variables are also applied while a new deployed application version is activated.

Variables are saved (versioned) along the deployed application version.

![service variables unsynced](/service-variables-unsynced.png "service variables unsynced")

