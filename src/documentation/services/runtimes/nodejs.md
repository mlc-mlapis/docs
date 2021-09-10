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

### Hostname

Choose a short and descriptive URL-friendly name, for example, **app**. The following rules apply:

* maximum length **==25==** characters,
* only lowercase ASCII letters **==a-z==** and numbers **==0-9==**,
* **==has to be unique==** in relation to other existing project's hostnames,
* the hostname **==can't be changed==** later.

### Port

**Node.js** service, together with the [Golang service](/documentation/services/runtimes/golang.html), is the only one that allows you to use **any port number** you want. The service can even have [multiple internal ports](/documentation/routing/routing-between-project-services.html) open (**0** - **65535**), running on **tcp** or **udp** protocols. The port will be preset to the **==tcp==** protocol and the value of **==3000==**. You can change it immediately or anytime later.

Additionally, the Zerops [routing system](/documentation/routing/using-your-domain.html) allows you to set the mappings between those internal ports and external Internet access. If you run a web server on that internal port (HTTP application protocol is supported), it means that you can even map [public Internet domains](/documentation/routing/using-your-domain.html) with the possibility of automatic support for SSL certificates (it also works for Zerops [subdomains](/documentation/routing/zerops-subdomain.html)).

![Custom Port](./images/Edit-Custom-Port.png "Edit Custom Port")

Because domain access or subdomains can be enabled only for **tcp** ports with support for HTTP, the checkbox **HTTP protocol support** allows marking such a case. In turn, Zerops uses this flag to optimize its internal logic to offer SSL certificates only in handy places.
