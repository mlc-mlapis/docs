# Runtime Logs

Each container on which your [service](/documentation/overview/projects-and-services-structure.html#service) is running gets its own runtime log. You can view each one within the **Runtime log** tab of your service detail.

<br/>

![runtime log](/runtime-log.png "runtime log")

<br/>

Whenever an important event happens, such as an exit or a failure, you will get a notification with a button pointing to the particular container and the relevant timestamp.

Because there are some logging specifics, you should also read the details about:

* [Logging in Node.js](/documentation/services/runtimes/nodejs.html#logging)

* [Logging in Golang](/documentation/services/runtimes/golang.html#logging)

* [Logging in PHP](/documentation/services/runtimes/php.html#logging)

* [Logging in Nginx](/documentation/services/static-servers/nginx.html#logging)
