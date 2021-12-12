# Runtime Logs

Each container your [service](/documentation/overview/projects-and-services-structure.html#service) is running on gets its own runtime log. You can view each one inside the **Runtime log** tab of your service detail.

<br/>

![runtime log](/runtime-log.png "runtime log")

<br/>

Whenever an important event happens, such as an exit or a failure, you will get a notification with a button pointing to the particular container and to the relevant timestamp.

Because there are some logging specifics dependent on each runtime environment, you should read details:

* [Logging in Node.js](/documentation/services/runtimes/nodejs.html#logging)
* [Logging in Golang](/documentation/services/runtimes/golang.html#logging)
* [Logging in PHP](/documentation/services/runtimes/php.html#logging)
