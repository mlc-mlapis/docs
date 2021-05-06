# Pricing

![Pricing](/pricing.png "Pricing")

<br />

### Free tier, unlimited projects and team members

As we [encourage](/documentation/overview/made-for-developers.html#each-developer-should-have-his-own-account-no-artificial-pricing-boosting) each developer to get their own account and even own copy of each project to be able to fully utilize our [local development tools](/documentation/cli/vpn.html), you will start with an unlimited number of [projects](/documentation/overview/projects-and-services-structure.html#project) and [team members](/documentation/overview/users.html#your-account) for free.

Each [service](/documentation/overview/projects-and-services-structure.html#service) you add inside those [projects](/documentation/overview/projects-and-services-structure.html#project) will start out as free as well. We're not talking small game here, each service will usually run on at least [three containers](/documentation/ha/why-should-i-want-high-availability.html), each of which with 1 vCPU, 250 MB RAM and 1 GB SSD of disk space on the beginning.

That way you can easily have 5 copies of a project out of which only the `myapp-production` version will be scaled up above the free tier and paid for.

### Automatic scaling in a matter of seconds

All services are [automatically scaled](/documentation/automatic-scaling/how-automatic-scaling-works.html) both [horizontally](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) (by increasing or decreasing the number of containers), and [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (by separately adding or removing CPUs, RAM size or disk space). Scaling happens in a matter of seconds and is continually optimized to run on the [best possible settings](/documentation/automatic-scaling/how-automatic-scaling-works.html#performance-tunning). Your credit is charged hourly, and the cost calculation takes into account the ratio changes during that time.


### Project add-ons for production

For the production version of your project, you can activate the following paid add-ons:

- a unique IPv4 address — $8 per 30 days

___
*The add-ons list will be growing up in time, and the next one in a row is longer-stored and more frequent backup.*
