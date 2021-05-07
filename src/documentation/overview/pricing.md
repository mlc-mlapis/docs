# Pricing

![Pricing](/pricing.png "Pricing")

The Zerops has three high-level pricing concepts. A credit that can be topped up by you manually or automatically, projects and services cost deducted daily or hourly, and paid add-ons working as subscriptions for 30 days following their activation. And nothing else, no other hidden or artificial costs.

## Team members

There is always a new idea at the beginning of something. To make it a reality, you need a team of co-developers. We [encourage](/documentation/overview/made-for-developers.html#each-developer-should-have-his-own-account-no-artificial-pricing-boosting) each developer to get an account to utilize our [local development tools](/documentation/cli/vpn.html) fully. It's **unlimited and free** in Zerops to establish a [team](/documentation/overview/users.html#your-account) as big as you want and need.

## Credit and free Zerops credit

Our free Zerops credit of \$100 on the beginning should allow you to start with less stress and more creativity to discover all features and added value for you and your team. It can be used for everything except for some add-ons, like the IPv4 address. After that, you can manually top up your credit using a credit card or set up weekly/monthly automatic payments. The VAT rate is 21% for EU countries. We will also notify you by e-mail at moments when your credit is too low (i.e., less than calculated 10%).

## Projects

Each [project](/documentation/overview/projects-and-services-structure.html#project) you add activates the **project basic package for \$5 per 30 days**, and this includes a unique IPv6 address, core services with built-in logging, and an L7 balancer that takes care of SSL certification and daily backups kept two days back. Additional add-ons can be activated for each project, depending on your use case, whether it's a production project or any other environment.

Any team member can create as many projects as necessary to cover each environment, even for a single hour or a day. Your credit is charged for a project basic package in a moment when the first project's service is added, but the rest of the amount is refundable in a case when the project is deleted. The calculation is based on a daily logic, and it also respects the time of its activation. That's why a project created on Monday at 5 PM and deleted on Tuesday at 11 AM, costs only \$5 / 30 \* 1, and the rest is refunded back to your credit. It also means that creating a project and deleting it after one hour of activity, and repeating this pattern X-times during the same day, leads to the cost of X \* \$5 / 30 * 1.

## Services

Each [service](/documentation/overview/projects-and-services-structure.html#service) you include into the [project](/documentation/overview/projects-and-services-structure.html#project) can be added either as non-HA [High Availability] (useful for development / test projects), which means it will run on a single container, or HA (mostly must-have for production projects), which means it will run on at least [three containers](/documentation/ha/why-should-i-want-high-availability.html). Each container starts with 1 vCPU, 250 MB RAM (with scaling up by 250 MB), and 5 GB of SSD disc space (with scaling up by 5 GB). The initial disk space will be changed to 1 GB with scaling up by 1 GB up soon to allow more dynamic configuration. All hardware resources can be automatically scaled both horizontally (increasing the number of containers) and vertically (adding resources).

There is a temporary limitation that doesn't allow you to switch back & forth between non-HA and HA modes on an individual service level. In the beginning, after adding such a service (that allows HA mode), you can decide if you switch to HA mode (if it's not done automatically by the QUICK ADD feature), but when you do it, you can't go back to non-HA mode (it will be removed soon by a new service cloning feature).

#### Hardware resource cost

- 1 vCPU: **\$2,5 per 30 days** (~ $0.00347 per hour)
- 250 MB RAM: **\$1.5 per 30 days** (~ $0.00208 per hour)
- 1 GB Disk: **\$0.2 per 30 days** (~ $0.00027 per hour)

## Automatic scaling in a matter of seconds

All services are [automatically scaled](/documentation/automatic-scaling/how-automatic-scaling-works.html) both [horizontally](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) (by increasing or decreasing the number of containers), and [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (by separately adding or removing CPUs, RAM size or disk space). Scaling happens in a matter of seconds and is continually optimized to run on the [best possible settings](/documentation/automatic-scaling/how-automatic-scaling-works.html#performance-tunning). Your credit is charged hourly, and the cost calculation considers the ratio of changes during that time.

## Add-ons for production

For the production version of your project, you can activate the following paid add-ons:

- [a unique IPv4 address](/documentation/routing/unique-ipv4-ipv6-addresses.html): **\$8 per 30 days**

## Examples

#### An application in a production phase

- IPv4
- HA Nginx: 3 x 1 vCPU + 250 MB + 5 GB Disk
- HA NodeJS: 3 x 1 vCPU + 500 MB + 5 GB Disk
- HA MongoDB 3 x 1 vCPU + 500 MB + 5 GB DISK

#### An application in a development/stage phase

- non-HA Nginx: 1 x 1 vCPU + 250 MB + 5 GB Disk
- non-HA NodeJS: 1 x 1 vCPU + 250 MB + 5 GB Disk
- HA MongoDB: 3 x 1 vCPU + 250 MB + 5 GB Disk

___
> *The add-ons list will be growing up in time, and the next one in a row is a longer-stored and more frequent backup.*
