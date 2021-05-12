# Pricing

![Pricing](/pricing.png "Pricing")

Zerops has three high-level pricing concepts. Credit that you can top up manually or automatically, project and service costs deducted daily or hourly, and paid add-ons working as subscriptions for 30 days following their activation. Nothing else, no hidden or artificial costs.

## Team members

At the beginning of something, there is always a new idea. To make it a reality, you need a team of co-developers. We [encourage](/documentation/overview/made-for-developers.html#each-developer-should-have-his-own-account-no-artificial-pricing-boosting) each developer to get their own Zerops account in order to fully utilize our [local development tools](/documentation/cli/vpn.html). In Zerops, establishing a [team](/documentation/overview/users.html#your-account) as big as you want and need is **unlimited and free**.

## Credit and free Zerops credit

In the beginning, you'll get \$100 worth of Zerops credit. This should allow you to start with less stress and more freedom to explore all of the features and added value for you and your team. The credit can be used for everything except for some of the add-ons, such as the IPv4 address. After using up the \$100, you can manually top up your credit using a credit card or set up weekly/monthly automatic payments. At the same time, you can also set up a daily project cost limit to ensure that your budget doesn't exceed the amount you want. The VAT rate is 21% for EU countries. We will also notify you by e-mail at moments when your credit is too low (i.e., less than calculated 10%).

## Projects

Each [project](/documentation/overview/projects-and-services-structure.html#project) you add activates the **project basic package for \$5 per 30 days**. This includes a unique IPv6 address, core services with built-in logging, an L7 balancer that takes care of SSL certification, and daily backups kept two days back. Further add-ons can be activated for each project, depending on your use case, whether it's a production project or any other environment.

Any team member can create as many projects as necessary to cover each environment, even for a single hour. Your credit is charged for a project basic package once the first project's service is added, but the unused portion of the amount is refundable if the project is deleted. The calculation is based on a daily logic, and it also respects the time of activation. That's why a project created on Monday at 5 PM and deleted on Tuesday at 11 AM, costs only \$5 / 30 \* 1, and the rest is refunded back to your credit balance. Also, creating a project and deleting it after one hour of activity, and repeating this pattern X-times during the same day, leads to the cost of X \* \$5 / 30 * 1.

## Services

Each [service](/documentation/overview/projects-and-services-structure.html#service) you include into the [project](/documentation/overview/projects-and-services-structure.html#project) can be added either as non-HA [High Availability] (useful for development / test projects), which means it will run on a single container, or HA (a must-have for production projects), which means it will run on at least [three containers](/documentation/ha/why-should-i-want-high-availability.html). Each container starts with 1 vCPU, 250 MB RAM (with scaling up by 250 MB increments), and 5 GB of SSD disk space (with scaling up by 0.5 GB increments). All hardware resources can be automatically scaled both horizontally (increasing the number of containers) and vertically (adding resources).

While adding a new service, you can choose whether you want it in HA (3 containers) or non-HA (1 container) mode, and the hourly cost will change accordingly. HA mode can't be changed later. We, however, plan to implement service cloning, allowing you safe migration back. Currently, it's not possible to create non-HA database/messenger/shared storage services but this limitation will be removed soon.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Cost of stopped services
Remember that disk space cost is still being calculated and charged if you stop any service because it occupies the reserved resources.
:::
<!-- markdownlint-enable DOCSMD004 -->

<!-- markdownlint-disable MD001 -->
#### Hardware resource cost and autoscaling
<!-- markdownlint-enable MD001 -->

All services are [automatically scaled](/documentation/automatic-scaling/how-automatic-scaling-works.html) both [horizontally](/documentation/automatic-scaling/how-automatic-scaling-works.html#horizontal-scaling) (by increasing or decreasing the number of containers), and [vertically](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (by adding or removing CPUs, RAM size, or disk space). Scaling happens in a matter of seconds and is continually optimized to run using the [best possible settings](/documentation/automatic-scaling/how-automatic-scaling-works.html#performance-tunning). Your credit is charged hourly for each resource on each container, and the cost calculation considers the ratio of changes during that time.

- 1 vCPU: **\$2,5 per 30 days** ($0.00347 per hour)
- 250 MB RAM: **\$1.5 per 30 days** ($0.00208 per hour)
- 0.5 GB Disk: **\$0.1 per 30 days** ($0.00014 per hour)

## Add-ons for production

For the production version of your project, you can activate the following paid add-ons:

- [a unique IPv4 address](/documentation/routing/unique-ipv4-ipv6-addresses.html): **\$8 per 30 days**

## Examples (on a regular basis)

<!-- markdownlint-disable MD001 -->
#### Application in production phase
<!-- markdownlint-enable MD001 -->

|Package / Service|Hardware resources              |     [hour]|      [day]|  [30 days]|
|:----------------|:-------------------------------|----------:|----------:|----------:|
|basic package    |                                |    $0.0069|    $0.1667|      $5.00|
|add-on IPv4      |                                |    $0.0111|    $0.2667|      $8.00|
|HA Nginx         |3x vCPU + 3x250 MB + 3x5 GB Disk|    $0.0208|    $0.5000|     $15.00|
|HA NodeJS        |3x vCPU + 3x500 MB + 3x5 GB Disk|    $0.0271|    $0.6500|     $19.50|
|HA MongoDB       |3x vCPU + 3x500 MB + 3x5 GB Disk|    $0.0271|    $0.6500|     $19.50|
|                 |                      **Total**:|**$0.0931**|**$2.2333**| **$67.00**|

#### Application in development phase

|Package / Service|Hardware resources              |     [hour]|      [day]|  [30 days]|
|:----------------|:-------------------------------|----------:|----------:|----------:|
|basic package    |                                |    $0.0069|    $0.1667|      $5.00|
|non-HA Nginx     |1x vCPU + 1x250 MB + 1x5 GB Disk|    $0.0069|    $0.1667|      $5.00|
|non-HA NodeJS    |1x vCPU + 1x250 MB + 1x5 GB Disk|    $0.0069|    $0.1667|      $5.00|
|HA MongoDB       |3x vCPU + 3x250 MB + 3x5 GB Disk|    $0.0208|    $0.5000|     $15.00|
|                 |                      **Total**:|**$0.0417**|**$1.0000**| **$30.00**|

___
> *The list of add-ons will grow in time,. Next up: longer-stored and more frequent backups.*
