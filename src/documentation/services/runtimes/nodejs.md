# Node.js

Zerops provides a fully managed and scaled Node.js runtime service, suitable for both development and production projects using any load. You can choose any option you want and be sure that it will work.

[[toc]]

## Adding the Node.js Service in Zerops

### Version to choose

You can currently choose Node.js version **v14.17**, **v12.13**, or **v10.17**. The chosen version of it **can't be changed afterward**.

<!-- markdownlint-disable DOCSMD004 -->
::: info Changing version
Switching must be done manually by creating a new service with another version and migrating service code using a new [deploy](/documentation/deploy/how-deploy-works.html) or [build & deploy](/documentation/build/how-zerops-build-works.html) process.
:::
<!-- markdownlint-enable DOCSMD004 -->

### Hostname and port

Choose a short and descriptive URL-friendly name, for example, **app**. The following rules apply:

* maximum length **==25==** characters,
* only lowercase ASCII letters **==a-z==** and numbers **==0-9==**,
* **==has to be unique==** in relation to other existing project's hostnames,
* the hostname **==can't be changed==** later.

The port will be preset to the default value of **==3000==**. You can change it immediately or anytime later. You can also add a new internal port by specifying its protocol (TCP / UDP), number (0 - 65535), and a used scheme.

