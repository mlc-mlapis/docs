# Typical schemas of Zerops Projects

Zerops infrastructure is built from the ground up based on the experience we have acquired over more than 13 years of running our own Tier 3 data center at VSHosting. It’s built on open source and thoroughly tested technologies, such as the lightweight [Linux Containers](https://linuxcontainers.org/#LXD) we chose over clunkier VM solutions. Let's take a peek inside a Zerops project ... :point_down:

## Without external access

This means no access from outside of the Zerops project infrastructure, such as the Internet. In this case, there's only communication between Zerops Project Core Service and any of the Zerops Service databases(([MariaDB (MySQL)](/documentation/services/databases/mariadb.html), ([PostgreSQL](/documentation/services/databases/postgresql.html), ([KeyDB (Redis)](/documentation/services/databases/keydb.html))), runtime environments, web servers, storages, search engines, message brokers) through the private network. Zerops Project Core Service is at the heart of each Zerops project. It's a part of our [Project Basic Package](/documentation/overview/pricing.html#projects) pricing logic.

The essential components are two running instances of a **project balancer** (one in an active state and the other in a standby backup state) through which all communication passes.

:::: tabs
::: tab Schema of Zerops Project
![Without external access](./images/Zerops-Project-Base-NoAccess.png "Project without external access")
:::
::: tab Detail of Project Core Service

Technically, the project balancer is a Layer 3 balancer (establishing connections only on the transport layer, i.e., TCP, UDP). An independent **scaling controller** monitors and controls [vertical scaling](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (vCPU, RAM, Disk) for both project balancer containers. An independent **repair controller** is then responsible for removing any container that exhibits abnormal behavior and subsequently replacing them with a new one.

This ensures a high degree of reliability and stability for all traffic at all times. Each runs in a different container located on a **different physical machine**. An independent **activity controller** continuously monitors critical operating parameters of both project balancers. If an active project balancer displays any abnormalities, the running standby backup is activated instead. From an external perspective, this change is not noticeable in any way.

You can also see details regarding the two remaining project core controllers. The **statistics one** is used for storing metrics of operational parameters of all project and service containers, and the **logger one** for recording all events. This legend can help you orient yourself.

![Without external access](./images/Zerops-Project-Core-Detail-NoAccess.png "Project without external access")
:::
::::

## With external access

This means access from outside of the Zerops project infrastructure, such as the Internet. The role of a **project balancer** is extended to public port routing and firewall and provides secure data communication between the Internet and your project. Again, all communication pases through either private network traffic or Internet traffic.

As mentioned earlier, the optional [firewall](/documentation/routing/access-through-ip-and-firewall.html) allows you to explicitly deny or allow access from the external Internet to each of the project's [public accessible ports](/documentation/routing/access-through-ip-and-firewall.html). For runtime environments or web server services, this essentially means that any port (except 80 or 443 ports) in combination with an assigned IPv4 or IPv6 address can be made public in this way (each project has only one free IPv6 or optionally one paid IPv4 as an add-on). For the remaining services (databases, search engines, message brokers), you have to use our [dev tools](/documentation/cli/vpn.html) (VPN access and Zerops CLI). For example, this is the case if you want to access database MariaDB Service on its native 3306 port. Storage services have a specific status and need to be approached with knowledge of their properties.

In addition, as a general principle, you can use activated Zerops [subdomains](/documentation/routing/zerops-subdomain.html) (`*.app.zerops.io`) or [your public domains](/documentation/routing/using-your-domain.html) if you have pointed their DNS A or AAAA records to those assigned IPv4 or IPv6 addresses on HTTP (80) or HTTPS (443) ports. **Zerops Routing Service** is started with defining the first of these public routing rules. This service, among other things, also takes care of SSL certificate management and internal translation of HTTPS protocol to HTTP.

:::: tabs
::: tab Schema of Zerops Project
![With external access](./images/Zerops-Project-Base-Internet.png "Project with external access")
:::
::: tab Detail of Project Core Service

The functionality is principally the same as in the case of Project Core Service without external access. The only additional part is an optional firewall.

![With external access](./images/Zerops-Project-Core-Detail-Internet.png "Project with external access")
:::
::: tab Detail of Routing Service

Technically, the **http balancers** (both in an active state) are Layer 7 balancers (handling all HTTP/S traffic for your project from outside environments). Again, a **scaling controller** manages [vertical scaling](/documentation/automatic-scaling/how-automatic-scaling-works.html#vertical-scaling) (vCPU, RAM, Disk) for both http balancer containers and a **repair controller** is responsible for fixing any abnormal behavior.

![With external access](./images/Zerops-Project-Routing-Detail-Internet.png "Project with external access")
:::
::::
