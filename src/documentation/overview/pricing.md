# Pricing

::: danger WE ARE IN THE BETA VERSION
There is no pricing system while we are still in the beta version.
:::

![Pricing](/pricing.png "Pricing")

<br />

### Free tier, unlimited projects and team members

As we [encourage](/documentation/overview/made-for-developers.html#each-developer-should-have-his-own-account-no-artificial-pricing-boosting) each developer to get their own account and even own copy of each project to be able to fully utilize our [local development tools](/documentation/cli/vpn.html), you will start with an unlimited number of [projects](/documentation/overview/projects-and-services-structure.html#project) and [team members](/documentation/overview/users.html#your-account) for free.

Each [service](/documentation/overview/projects-and-services-structure.html#service) you add inside those [projects](/documentation/overview/projects-and-services-structure.html#project) will start as free as well. We're not talk some small game here, each service will usually run on at least [two containers](/documentation/ha/why-should-i-want-high-availability.html), each of which with at least 1 CPU, 1 GB RAM and 5 GB of disc space.

So you can easily have 5 copies of a project out of which only the `myapp-production` version will be scaled up above the free tier and paid for.

### Automatic scaling in a matter of seconds

All services are [automatically scaled](/documentation/automatic-scaling/how-automatic-scaling-works.html) both [horizontally](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) - by increasing or decreasing a number of containers - and [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) - by separately adding or removing CPUs, RAM size or disc space. Scaling happens in a matter of seconds and is always optimized to run on the [best possible settings](/documentation/automatic-scaling/how-automatic-scaling-works.html#performance-tunning). You are then billed hourly.


### Project add-ons for production

For production version of you project, you can activate a couple of add-ons:

- unique IPv4 address — $1 / month
- longer and more frequent backups — $10 / month

