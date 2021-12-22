# MongoDB

Zerops provides a fully managed and scaled MongoDB database service, suitable for both development and production projects on any load. You can choose any variant you wish in the knowledge that it will work. Your peace of mind is our top priority.

[[toc]]

## Adding MongoDB service in Zerops

### Which version to choose

You can currently choose **v4.0**. The chosen version of the database **can't be changed afterward**.

Used as the export & import type: ==`mongodb@4`== .

### Hostname and port

Choose a short and descriptive URL-friendly name, for example, **mongo**. The following rules are required:

* maximum length **==25==** characters
* only lower ASCII letter **==a-z==** and numbers **==0-9==**

<!-- markdownlint-disable DOCSMD004 -->
::: warning Hostname is also used as a default admin user name
A chosen **hostname** is automatically used to create an admin user account with root privileges for accessing the database. You can change it later if you want.
:::
<!-- markdownlint-enable DOCSMD004 -->

The port will automatically be set to the value of **==27017==** and can't be changed.
