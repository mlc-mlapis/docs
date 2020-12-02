# Commit changes and restart to apply

Changes to environment variables are not applied directly but has to be commited first and then the services has to be **restarted for them to apply**. Alternatively commited environment variables are applied while a new deploy is activated.

// FIXME
Each deploy has a versioned version of the environment variables active at them time.


![service variables unsynced](/service-variables-unsynced.png "service variables unsynced")

