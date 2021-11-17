# Elasticsearch

Zerops provides a fully managed and scaled [Elasticsearch](https://www.elastic.co/what-is/elasticsearch) service (without **Kibana GUI**), suitable for both development and production projects using any load. It's a distributed, open search and analytics engine for all types of data, including textual, numerical, geospatial, structured, and unstructured. You can choose any option you want and be sure that it will work.

[[toc]]

## Adding the Elasticsearch Service in Zerops

Zerops Elasticsearch service is based on a [Linux LXD container](/documentation/overview/projects-and-services-structure.html#services-containers). It has pre-installed the Git version control system.

### Two ways how to do it

You have two possible ways to create a new Nginx service. Either manually in the Zerops GUI, as described in the [rest of this document](#version-to-choose), or using Zerops [import functionality](/documentation/export-import/project-service-export-import.html#how-to-export-import-a-project).

#### Simple import example in the YAML syntax

Zerops uses a YAML definition format to describe the structure. To import a service, you can use something similar to the following.

```yaml
services:
  # Service will be accessible through zcli VPN under: http://es
  - hostname: es
    # Type and version of a used service.
    type: elasticsearch@7
    # Whether the service will be run on one or multiple containers.
    # Since this is a simple example, using only one container is fine.
    mode: NON_HA
```

A complete specification of the [import/export syntax in the YAML format](/documentation/export-import/project-service-export-import.html#used-yaml-specification).

### Version to choose

You can currently choose **v7.12** or **v6.8**. The chosen version of the database **can't be changed afterward**.

Used as the export & import types: ==`elasticsearch@7`== or ==`elasticsearch@6`== .

<!-- markdownlint-disable DOCSMD004 -->
::: info Changing version
Switching must be done manually by creating a new service with another version and migrating data using a [snapshot](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html) backup / restore pattern.
:::
<!-- markdownlint-enable DOCSMD004 -->

### Hostname and port

Choose a short and descriptive URL-friendly name, for example, **es**. The following rules apply:

* maximum length **==25==** characters,
* only lowercase ASCII letters **==a-z==** and numbers **==0-9==**,
* **==has to be unique==** in relation to other existing project's hostnames,
* the hostname **==can't be changed==** later.

The port will automatically be set to the value of **==9200==** and can't be changed.

<!-- markdownlint-disable DOCSMD004 -->
::: warning Security inside a private project network
All services inside a Zerops project share a [dedicated private network](/documentation/routing/routing-between-project-services.html) and can see and reference [environment variables](/documentation/environment-variables/how-to-access.html) from other services. It means that by default, nothing outside the project can access any of the services inside.

The Elasticsearch service is configured to **allow full and unrestricted access without user authentication** only from the project internal network environment. In practice, this means that this service can only be accessed either programmatically through the runtime environment services ([Node.js](/documentation/services/runtimes/nodejs.html#port), [Golang](/documentation/services/runtimes/golang.html#port), [PHP](/documentation/services/runtimes/php.html#hostname-and-port)) or using [zcli](/documentation/cli/installation-authorization.html) and [vpn](/documentation/cli/vpn.html) from your local environment, nothing else.
:::
<!-- markdownlint-enable DOCSMD004 -->

### HA / non-HA mode

When creating a new service, you can choose whether the database should be run in **HA** (High Availability) mode, initially using 3 containers by default, or **non-HA mode**, using only 1 container. ==**The chosen mode can't be changed later.**== If you would like to learn more about the technical details and how this service is internally built, take a look at the [Elasticsearch Service in HA Mode, Internal](/documentation/overview/how-zerops-works-inside/elasticsearch-cluster-internally.html).

#### Elasticsearch in non-HA mode

* great for local development to save money,
* data is stored only in a single container, higher risk of data loss,
* all data changes since the last backup is not recoverable,
* the need to respect the Zerops [specifics](#what-specifics-you-should-remember),
* not recommended for production projects.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Recommendation
Even when using the non-HA mode for a production project, we recommend you implement the same logic and consider other possible related factors as you would do in the HA mode because you never know when you'll need to switch to it.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### Elasticsearch in HA mode

* will run initially on three containers as a [Elasticsearch cluster](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-discovery.html) with standard vendor provided functionality, each on a **different physical machine**,
* so the data is stored redundantly (by default in three places), with no risk of data loss,
* when one container fails, it's automatically replaced with a new one,
* with two load [Nginx Layer 7](https://www.nginx.com/resources/glossary/layer-7-load-balancing) balancers (no additional cost) that route incoming HTTP traffic in a sophisticated way directly to Elasticsearch cluster data nodes,
* the need to respect the Zerops [specifics](#what-specifics-you-should-remember),
* recommended for production projects.

## What specifics you should remember

### Don't use sniffing to optimize a connection from a client-side

Elasticsearch is a distributed system, which means its indices live in multiple nodes connected to each other, forming a cluster. One of the main advantages of being a distributed system — other than fault tolerance — is data can be sharded into multiple data nodes, allowing searches to run much faster than searches run through a single node.

In Zerops environment, the Elasticsearch service uses two load [Nginx Layer 7](https://www.nginx.com/resources/glossary/layer-7-load-balancing) balancers to route incoming HTTP traffic directly to cluster data nodes.

It would be a mistake for the client application to get a list of data nodes to communicate (sniffering). The point is that, on the one hand, there is no sense from the performance point of view, and in the event of any change in the cluster arrangement (e.g., failure of one data node and its replacement by another), such a list would not even correspond to reality.

<!-- markdownlint-disable DOCSMD004 -->
::: info Authentication is not required
It's unnecessary to use any authentication because the Elasticsearch service is [fully accessible inside](#hostname-and-port) the Zerops project private network.
:::
<!-- markdownlint-enable DOCSMD004 -->

From the point of view of individual client SDKs, the following applies:

#### Node.js

Get the ==**`connectionString`**== environment variable published by your Elasticsearch service and [build the API client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-connecting.html#client-usage) using the taken host and disabled sniffering.

```javascript
const {Client} = require('@elastic/elasticsearch');
// Get the global environment object.
const env = process.env;
// The chosen hostname of the Elasticsearch service.
const hostname = 'es';
// The requested environment variable name.
const connectionString = 'connectionString';
// For example, the result of the <host> would be: ["http://es:9200"]
const host = env[`${hostname}_${connectionString}`];
const esClient = new Client({
  node: host
  // Sniffering should be disabled.
  sniffOnStart: false
});
```

#### Golang

Get the ==**`connectionString`**== environment variable published by your Elasticsearch service and [build the API client](https://www.elastic.co/blog/the-go-client-for-elasticsearch-configuration-and-customization) using the taken host and disabled sniffer (disable nodes discovering).

```golang
import (
  "github.com/elastic/go-elasticsearch/v7"
)
// The chosen hostname of the Elasticsearch service.
const hostname = "es"
// The requested environment variable name.
const connectionString = "connectionString"
// For example, the result of the <host> would be: ["http://es:9200"]
host, found := os.LookupEnv(hostname + "_" + connectionString)
cfg := elasticsearch.Config{
  Addresses: []string{host},
  // Sniffering should be disabled.
  DiscoverNodesOnStart: false,
}
esClient, err := elasticsearch.NewClient(cfg)
```

#### PHP

Get the ==**`connectionString`**== environment variable published by your Elasticsearch service and [build the API client](https://www.elastic.co/guide/en/elasticsearch/client/php-api/current/connceting.html) using the taken host.

```php
use Elasticsearch\ClientBuilder;
// The chosen hostname of the Elasticsearch service.
$hostname = "es";
// The requested environment variable name.
$connectionString = "connectionString";
// For example, the result of the <$hosts> would be: ["http://es:9200"]
$hosts = [getenv("${hostname}_${connectionString}")];
$esClient = ClientBuilder::create()
  ->setHosts($hosts)
  // Sniffering should be disabled.
  ->setSniffOnStart(false)
  ->build();
```
