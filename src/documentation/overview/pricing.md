# Pricing

![Pricing](/pricing.png "Pricing")

The Zerops has three high-level pricing concepts. A credit that can be topped up by you manually or automatically, projects and services cost deducted daily or hourly, and paid add-ons working as subscriptions for 30 days following their activation. And nothing else, no other hidden or artificial costs.

## Team members

There is always a new idea at the beginning of something. To make it a reality, you need a team of co-developers. We [encourage](/documentation/overview/made-for-developers.html#each-developer-should-have-his-own-account-no-artificial-pricing-boosting) each developer to get an account to utilize our [local development tools](/documentation/cli/vpn.html) fully. It's **unlimited and free** in Zerops to establish a [team](/documentation/overview/users.html#your-account) as big as you want and need.

## Credit and free Zerops credit

Our free Zerops credit of \$100 on the beginning should allow you to start with less stress and more creativity to discover all features and added value for you and your team. It can be used for everything except for some add-ons, like the IPv4 address. After that, you can manually top up your credit using a credit card or set up weekly/monthly automatic payments. On the other side, you can set up also a daily project cost limit to ensure that your budget doesn't exceed the amount you want. The VAT rate is 21% for EU countries. We will also notify you by e-mail at moments when your credit is too low (i.e., less than calculated 10%).

## Projects

Each [project](/documentation/overview/projects-and-services-structure.html#project) you add activates the **project basic package for \$5 per 30 days**, and this includes a unique IPv6 address, core services with built-in logging, and an L7 balancer that takes care of SSL certification and daily backups kept two days back. Additional add-ons can be activated for each project, depending on your use case, whether it's a production project or any other environment.

Any team member can create as many projects as necessary to cover each environment, even for a single hour or a day. Your credit is charged for a project basic package in a moment when the first project's service is added, but the rest of the amount is refundable in a case when the project is deleted. The calculation is based on a daily logic, and it also respects the time of its activation. That's why a project created on Monday at 5 PM and deleted on Tuesday at 11 AM, costs only \$5 / 30 \* 1, and the rest is refunded back to your credit. It also means that creating a project and deleting it after one hour of activity, and repeating this pattern X-times during the same day, leads to the cost of X \* \$5 / 30 * 1.

## Services

Each [service](/documentation/overview/projects-and-services-structure.html#service) you include into the [project](/documentation/overview/projects-and-services-structure.html#project) can be added either as non-HA [High Availability] (useful for development / test projects), which means it will run on a single container, or HA (mostly must-have for production projects), which means it will run on at least [three containers](/documentation/ha/why-should-i-want-high-availability.html). Each container starts with 1 vCPU, 250 MB RAM (with scaling up by 250 MB), and 5 GB of SSD disk space (with scaling up by 1 GB). All hardware resources can be automatically scaled both horizontally (increasing the number of containers) and vertically (adding resources).

While adding a new service, you can choose whether you want it in HA (3 containers) or non-HA (1 container) mode, and the hourly cost will change accordingly. HA mode can't be changed later. We, however, plan to implement service cloning, allowing you safe migration back. Currently, it's not possible to create non-HA database/messenger/shared storage services, and this limitation will be removed soon.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Cost of stopped services
Remember that only disk space cost is being calculated and charged if you stop any service because it still occupies the reserved resources.
:::
<!-- markdownlint-enable DOCSMD004 -->

<!-- markdownlint-disable MD001 -->
#### Hardware resources cost and autoscaling
<!-- markdownlint-enable MD001 -->

All services are [automatically scaled](/documentation/automatic-scaling/how-automatic-scaling-works.html) both [horizontally](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) (by increasing or decreasing the number of containers), and [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (by separately adding or removing CPUs, RAM size or disk space). Scaling happens in a matter of seconds and is continually optimized to run on the [best possible settings](/documentation/automatic-scaling/how-automatic-scaling-works.html#performance-tunning). Your credit is charged hourly for each resource on each container, and the cost calculation considers the ratio of changes during that time.

- 1 vCPU: **\$2,5 per 30 days** ($0.00347 per hour)
- 250 MB RAM: **\$1.5 per 30 days** ($0.00208 per hour)
- 1 GB Disk: **\$0.2 per 30 days** ($0.00027 per hour)

## Add-ons for production

For the production version of your project, you can activate the following paid add-ons:

- [a unique IPv4 address](/documentation/routing/unique-ipv4-ipv6-addresses.html): **\$8 per 30 days**

## Examples (on regular basis)

<!-- markdownlint-disable MD001 -->
#### An application in a production phase
<!-- markdownlint-enable MD001 -->

|Package / Service|Hardware resources              |     [hour]|      [day]|  [30 days]|
|:----------------|:-------------------------------|----------:|----------:|----------:|
|basic package    |                                |    $0.0069|    $0.1667|      $5.00|
|add-on IPv4      |                                |    $0.0111|    $0.2667|      $8.00|
|HA Nginx         |3x vCPU + 3x250 MB + 3x5 GB Disk|    $0.0208|    $0.5000|     $15.00|
|HA NodeJS        |3x vCPU + 3x500 MB + 3x5 GB Disk|    $0.0271|    $0.6500|     $19.50|
|HA MongoDB       |3x vCPU + 3x500 MB + 3x5 GB Disk|    $0.0271|    $0.6500|     $19.50|
|                 |                      **Total**:|**$0.0931**|**$2.2333**| **$67.00**|

#### An application in a development/stage phase

|Package / Service|Hardware resources              |     [hour]|      [day]|  [30 days]|
|:----------------|:-------------------------------|----------:|----------:|----------:|
|basic package    |                                |    $0.0069|    $0.1667|      $5.00|
|non-HA Nginx     |1x vCPU + 1x250 MB + 1x5 GB Disk|    $0.0069|    $0.1667|      $5.00|
|non-HA NodeJS    |1x vCPU + 1x250 MB + 1x5 GB Disk|    $0.0069|    $0.1667|      $5.00|
|HA MongoDB       |3x vCPU + 3x250 MB + 3x5 GB Disk|    $0.0208|    $0.5000|     $15.00|
|                 |                      **Total**:|**$0.0417**|**$1.0000**| **$30.00**|

___
> *The add-ons list will be growing up in time, and the next one in a row is a longer-stored and more frequent backup.*
