# Golang

Zerops provides a fully managed and scaled Golang runtime service, suitable for both development and production projects using any load. You can choose any option you want and be sure that it will work.

[[toc]]

## Adding the Golang Service in Zerops

### Version to choose

You can currently only choose Golang version **v1.16**.

Used as the export & import type: ==`golang@1`== .

### Hostname

Choose a short and descriptive URL-friendly name, for example, **app**. The following rules apply:

* maximum length **==25==** characters,
* only lowercase ASCII letters **==a-z==** and numbers **==0-9==**,
* **==has to be unique==** in relation to other existing project's hostnames,
* the hostname **==can't be changed==** later.

### Port

The **Golang** service, together with the [Node.js service](/documentation/services/runtimes/nodejs.html), is the only one that allows you to use **any port number** you want. The service can even have [multiple internal ports](/documentation/routing/routing-between-project-services.html) open (**1** - **65535**), running on **tcp** or **udp** protocols. The port will be preset to the **==tcp==** protocol and the value of **==8080==**. You can change it immediately or anytime after that.

Additionally, the Zerops [routing system](/documentation/routing/using-your-domain.html) allows you to set the mappings between those internal ports and external Internet access. If you run a web server on that internal port (HTTP application protocol is supported), it means that you can even map [public Internet domains](/documentation/routing/using-your-domain.html) with the option of automatic support for SSL certificates (it also works for Zerops [subdomains](/documentation/routing/zerops-subdomain.html)).

![Custom Port](./images/Edit-Custom-Port-8080.png "Edit Custom Port")

Because domain access or subdomains can only be enabled for **tcp** ports with support for HTTP, the checkbox **HTTP protocol support** allows for marking such a case. In turn, Zerops uses this flag to optimize its internal logic to offer this option and SSL certificates only in handy places.

To understand this better, take look at the section [With external access](/documentation/overview/how-zerops-works-inside/typical-schemas-of-zerops-projects.html#with-external-access) of **Typical schemas of Zerops Projects**. In general, the logic is not that you would open some ports primarily in Zerops and thus put some functionality into operation, but that the given Golang application in a particular container binds to a local port (e.g., 8080). The following setting in Zerops then only creates the path to it. In other words, nothing is accessible at the beginning from the outside, and you will map only a specific route with this setting.

### Start Command

A command that should start your service will be triggered after each deployment or after you manually start or re-start it. For example, if the result of your Golang application build command ==`go build -o ./bin/server ./app/server.go`== is an executable deployed via the [zerops.yml](/documentation/build/build-config.html#deploy) `deploy: [ "./bin/server" ]` directive, then the start command should be ==`./bin/server`== .

### HA / non-HA runtime environment mode

When creating a new service, you can choose whether the runtime environment should be run in **HA** (High Availability) mode, using 3 or more containers, or **non-HA mode**, using only 1 container. ==**The chosen runtime environment mode can't be changed later.**== If you would like to learn more about the technical details and how this service is internally built, take a look at the [Golang Service in HA Mode, Internal](/documentation/overview/how-zerops-works-inside/golang-cluster-internally.html) part of the documentation.

#### Golang runtime in non-HA mode

* great for local development to save money,
* doesn’t require any changes to the existing code,
* not necessary to respect HA mode [specifics](#what-you-should-remember-when-using-the-ha-mode), but see the recommendation tip below,
* not recommended for production projects.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Recommendation
Even when using the non-HA mode for a production project, we nonetheless recommend you respect all of the [HA mode specifics](#what-you-should-remember-when-using-the-ha-mode) because you never know when you'll need to switch to the HA mode.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### Golang runtime in HA mode

* will start to run on three containers, each on a **different physical machine**,
* with increasing operating load, the number of containers can reach up to 64,
* so the application runs redundantly in 3 or more places, with no risk of total failure,
* when one container fails, it's automatically replaced with a new one,
* the need to respect all of the [specifics](#what-you-should-remember-when-using-the-ha-mode) related to a Golang cluster,
* recommended for production projects.

## How to deploy application code

<!-- markdownlint-disable DOCSMD004 -->
::: tip Preface
Conceptually, you can either use Zerops deploy functionality to upload already built application files to Zerops, say at the end of your existing CI/CD pipeline, or utilize Zerops build & deploy pipeline, which can build and then deploy the application for you automatically.
:::
<!-- markdownlint-enable DOCSMD004 -->

There are **two ways** by which you can physically deliver application code to the service. Either via a direct connection to a [GitHub](/documentation/github/github-integration.html) or [GitLab](/documentation/gitlab/gitlab-integration.html) repository or by using the Zerops **zcli** [push](/documentation/cli/available-commands.html#push-project-name-service-name) or [deploy](/documentation/cli/available-commands.html#deploy-project-name-service-name-space-separated-files-or-directories) commands.

When a Zerops service has been connected to a GitHub or GitLab repository, you can select the checkbox `Build immediately after the service creation` to run the first build immediately after the service creation. Otherwise, you have to make a **new commit/tag** to invoke that first [build & deploy](http://localhost:8081/documentation/build/how-zerops-build-works.html) pipeline task.

![Service connected to a Repository](./images/Repository-Triggering-Tag-Commit.png "Repository triggering on a Tag/Commit")

When the build process has been successfully finished, you can download the entire zipped **artifact of the build container** and browse locally if you need to check its content.

![Build Artifact](./images/Download-Build-Artefact-Golang.png "Download build artifact")
![Build Artifact](./images/Download-Build-Artefact-Golang-App-Version.png "Download build artifact")

## Accessing a Zerops S3 Object Storage

You can [access the object storage](/documentation/services/storage/s3.html#how-to-access-an-object-storage-service) using its public [API URL endpoint](#api-url-endpoint-and-port) in the same way as any access from the outside Internet, including your local development environment.

## Accessing a Zerops Shared Storage

When a Zerops Golang Service is created, you can mount a Zerops [Shared Storage Service](/documentation/services/storage/shared.html#storage-mounting) to it. If you don't have any as of yet, create a new one first.

Because Golang code runs under the **`root`** user account, any saved file has `-rw-r--r-- root root` permissions and created directories `drwxr-xr-x root root`.

The **`zeropsSharedStorageMounts`** environment variable allows you to get the list of mounted shared storage services (separated by a pipe, if there are more than only one). For more flexibility, it's always recommended to use such environment variables indirectly, as shown in an example of [custom environment variables](/knowledge-base/best-practices/how-to-use-environment-variables-efficiently.html), in each project service separately.

## How to access a Golang runtime environment

<!-- markdownlint-disable DOCSMD004 -->
::: warning Don't use additional security protocols for internal communication
The runtime environment service is not configured to support direct access using SSL/TLS or SSH protocols for internal communication inside a Zerops project private secured network. This is also the case for access using the Zerops [zcli](/documentation/cli/installation.html) through a secure VPN channel.
:::
<!-- markdownlint-enable DOCSMD004 -->

### From other services inside the project

Other services can access the Golang application using its **hostname** and **port**, as they are part of the same private project network.

It's always recommended to not set the configuration values as constants directly into the application code. It is preferable to use them indirectly, for example, via [custom environment variables](/knowledge-base/best-practices/how-to-use-environment-variables-efficiently.html), referencing Zerops [implicit environment variables](/documentation/environment-variables/helper-variables.htm) and given that [all environment variables](/documentation/environment-variables/how-to-access.html) are shared within the project across all services.

### From the local environment

The local environment offers ==**not only possibilities for local development**== but also a general ability to ==**manage all Zerops development or production services**== , using zcli VPN.

You can access the Zerops Golang Service from your local workspace by using the [VPN](/documentation/cli/vpn.html) functionality of our [Zerops zcli](/documentation/cli/installation.html), as mentioned above. This might come in handy if you, for example, use the service as a REST API and you don’t want it publicly available (via [public domains](/documentation/routing/using-your-domain.html) or Zerops [subdomains](/documentation/routing/zerops-subdomain.html)), so you connect to the project using **zcli VPN** and use ==`app:8080`== as your API endpoint.

You can also run an application fully in your local workspace and access other services in the Zerops project using the VPN. However, you cannot use references to the environment variables because you are outside of the project's network. Therefore, you should copy the values manually if you need some of them and use them in your private local configuration strategy.

## Default hardware configuration and autoscaling

* Each Golang container (1 in non-HA, 3 in HA) starts with 1 vCPU, 0.25 GB RAM, and 5 GB of disk space.
* Zerops will automatically scale the resources vertically (both in non-HA and HA mode up to 32 vCPU, 128 GB RAM, 1 TB disk space) and horizontally (HA mode only up to 64 containers).

## Logging

Both console and **important** system messages coming from the container's runtime environment are configured using a syslog service to centralize all records and allowing live access through the **Runtime log** tab inside your service detail for each Zerops service container. It's not necessary to refresh the view. New logs are automatically passed through a web socket channel and shown immediately.

![Runtime log](./images/Runtime-Log.png "Runtime log access")

All messages sent to **Stderr** (standard error file descriptor) or **Stdout** (standard output file descriptor), using the Golang `fmt` or `log` packages, are processed via **Linux Systemd daemon** as log messages with **facility number 16** ( ==`local0`== ) and **severity 6** (**Informational**) by default (see [RFC5424](https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1)).

If you want to set another severity, use a message prefix ==`<N>`== to encode such a log severity in printed lines, as shown below.

```go
fmt.Println("A message with the informational severity ...")
fmt.Println("<0>Emergency (0) severity > system is unusable.")
fmt.Println("<1>Alert (1) severity > action must be taken immediately.")
fmt.Println("<2>Critical (2) severity > critical conditions.")
fmt.Println("<3>Error (3) severity > error conditions.")
fmt.Println("<4>Warning (4) severity > warning conditions.")
fmt.Println("<5>Notice (5) severity > normal, but significant, condition.")
fmt.Println("<6>Informational (6) severity > informational message.")
fmt.Println("<7>Debug (7) severity > debug-level message.")

log.SetFlags(0) // To eliminate a timestamp as a default message prefix.
log.Println("--- Ekvivalent using log package ---")
log.Println("A message with the informational severity ...")
log.Println("<0>Emergency (0) severity > system is unusable.")

fmt.Println("--- Ekvivalent syntax using Stderr & Stdout ---")
fmt.Fprintf(os.Stderr, "<3>Error (3) severity > error conditions.\n")
fmt.Fprintf(os.Stdout, "<0>Emergency (0) severity > system is unusable.\n")
```

Then you can show log messages with **facility number 16** ( ==`local0`== ) in the **Runtime log** view and choose the severity level, or show all of them by selecting the **All** option. Keep the dedicated switch **Show web server logs** in the disabled state. It is related only to the web server access & error logs if anyone is operated in the runtime environment.

![Logs](./images/Log_Records_Severities_Golang.png "Logs by severity")

When you configure and run a web server (for example, [Gin](https://github.com/gin-gonic/gin), [BeeGo](https://github.com/astaxie/beego), [Echo](https://github.com/labstack/echo), [Fast HTTP](https://github.com/valyala/fasthttp)) as a part of application code, you may have reasons to make logging by a different way, for example, using logging libraries like [Zerolog](https://github.com/rs/zerolog), or [Logrus](https://github.com/sirupsen/logrus). These could be more suitable for your projects, especially for the production environment.

The important thing in such cases is choosing **facility number 17** ( ==`local1`== ) as the configuration option. The reason is the dedicated switch **Show web server logs** in the **Runtime log** view that allows you to show web access & error logs separately from standard application logs. It's important, especially from the access logs point of view, because there could be thousands and thousands of records.

<!-- markdownlint-disable DOCSMD004 -->
::: info Stdout & Stderr output streams
**In the Zerops environment, the output is piped to a logger controller of the Project Core Service, so logging operations are processed asynchronously** (see [Detail of Project Core Service](/documentation/overview/how-zerops-works-inside/typical-schemas-of-zerops-projects.html) tab). The environment was tested for throughput around ~50K logs/second.
:::
<!-- markdownlint-enable DOCSMD004 -->

<!-- markdownlint-disable DOCSMD004 -->
::: warning Supported facility numbers
Don't use any other facility number except ==`local0`== and ==`local1`== as shown above. If you use another one (0 .. 15, 18 .. 23) by [RFC5424](https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1), they will be filtered out on the Zerops backend and you won't see them in the Zerops GUI. At the same time, **important** system messages originating from the container's runtime environment are checked and transparently included in the application logs, regardless of their original facility number, to inform the user.
:::
<!-- markdownlint-enable DOCSMD004 -->

## How to browse the content of a runtime container

You can use **File browser** functionality available in all runtime services to view folders, files, and their contents & attributes. The mounted shared storage disks are accessible at the path ==/mnt/== .

![File browser](./images/Runtime-File-Browser.png "File browser feature")

## How to detect HTTPS sessions

Zerops Routing Service (see the schema of a Zerops project with [external access](/documentation/overview/how-zerops-works-inside/typical-schemas-of-zerops-projects.html#with-external-access)) takes care of SSL certificate management and internal translation of HTTPS protocol to HTTP for all project's services.

Your application logic may need to check or do something when a client is accessing it using an HTTPS protocol (user's encrypted requests). In such a case, it's possible to inspect the **`x-forwarded-proto`** header. You can see an example of this below using a super simple Golang application that uses the Golang native `net/http` package to implement and run a web server.

```go
package main

import (
  "fmt"
  "log"
  "net/http"
  "strings"
)

func main() {
  http.HandleFunc("/", CheckProtocol)
  if err := http.ListenAndServe(":8080", nil); err != nil {
    log.Fatal(err)
  }
}

func CheckProtocol(w http.ResponseWriter, r *http.Request) {
  forwarded := r.Header.Get("x-forwarded-proto")
  if forwarded == "" {
    fmt.Fprintln(w, "... x-forwarded-proto header does not exist")
    return
  }
  if strings.ToLower(forwarded) == "https" {
      fmt.Fprintln(w, "... secured communication through HTTPS protocol")
      return
  }
  fmt.Fprintln(w, "... communication only through HTTP protocol")
}
```

## What you should remember when using the HA mode

### Locally stored data only for a temporary purpose

You should not store your permanent data or sessions in the local disk space of containers running your application. The reason being that locally stored data is reserved only for this particular container instance, not mirrored across the Golang cluster nor backup-ed. It will not be migrated if such a container is deleted due to its failure. If it is necessary to store and share such data permanently, we recommend developers to preferably utilize [Zerops Shared Storage](/documentation/services/storage/shared.html) or [Zerops S3 compatible Object Storage](/documentation/services/storage/s3.html) services.

## Known specifics

* Golang application itself is run via **systemd** service unit, which keeps it running and handles restarts.
