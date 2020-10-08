# Introduction

Zerops is a cloud **platform-as-a-service** (PaaS) made [by developers for developers](/documents/overview/made-for-developers). All of Zerops' services, whether it's a [runtime](), [static server](), [database]() or [storage](), are HA ([high availability]()) enabled by default and [automatically scaled]() and **optimized** to always run in the [most efficient setting]().

**Here are the main things Zerops aims to solve for you:**

### 1. Build, deploy and run your applications or serve static files

A good build and deploy setup is hard, so we try to make it easy no matter your usecase. You can [connect your service with a GitHub repository]() to automatically trigger build and deploy pipeline using the [`zerops.yml`]() build definition file.

Alternatively use [Zerops CLI]() to manully trigger [deploy]() of your build artefacts, or `zcli push` cli [command]() to start build and deploy pipeline. No matter if you do it locally from you terminal, or from [GitHub Actions](), [Gitlab CD/CI]() or any other [CI service]().

Whether you need to serve a [JAMSTACK]() app or run an environment, we have you covered. Serve a static [Angular](), [Vue]() or [react]() app from our [nginx server](), run multiple [Node.js](), [Golang]() or [PHP]() applications on Zerops [runtime services]().


### 2. Fully manage databases

All databases Zerops manages are running on at least [three hardware separated nodes]() to ensure the highest possibly [security and reliability]() of you data. Each of [MariaDB (MySQL)](), [MongoDB](), [Redis](), [Elasticsearch]() is fine tuned to be as performant at any given [automatic scaling state](). Everything fully managed by Zerops with [backups]() on different real life locations.


### 3. Take care of internal and public routing

Each service can [securely communicate]() with other services inside the same project using their hostnames and ports, i.e. your Golang app service (`myapp:3000`) can access a mongo database service(`mydatabase:27017`) using `mongodb://mydatabase:27017` connection string. You can manage which ports are open inside the Zerops.io app.

If your application needs to be publicly accesible, Zerops can easily set up access from your [domains](), as well as direct access thru [unique IPv4 or IPv6 address](), with ability to setup [firewall]() rules. Zerops also generates a [*.zerops.io subdomain]() if you just needs to test things out.


### 4. Inteligent automatic scaling from zero to enterprise projects

Zerops is able to [scale, both horizontally and vertically]() your services, whether it's a runtime or, database or a storage. A service can easilly go **from** `1x CPU`, `1 GB ram` on `3 containers` **to** `96x CPU`, `2 TB RAM` on `64 containers` and back down in matter of seconds, all scaling operations optimized for particular technology and its version.


### 5. Developer friendly

We try to not get in your way. We know that for a good dev experience you might want a separate infrastructure for each environment (stage, prod), or even each developer, that's why Zerops has no limit of number of projects or team members. Each service starts free, you only start paying once your applications or databases need to scale up.

We also provide a number of tools to make dev life easier, once of which is the [VPN]() capability of our CLI, so you can [locally connect]() to any of your running services by using its Zerops hostname and a port, i.e. visiting `http://myapp:3000` or `mongodb://mydatabse:27017` will work for you.
