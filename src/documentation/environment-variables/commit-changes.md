# Commit Changes and Restart to Apply

Changes to environment variables are not applied directly but have to be commited first and then the affected services have to be manually **restarted for the changes to apply**. Commited environment variables are also applied when a new deployed application version is activated.

Variables are saved (versioned) along the deployed application version.

![service variables unsynced](/service-variables-unsynced.png "service variables unsynced")

