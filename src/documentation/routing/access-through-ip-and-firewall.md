# Access your services using IP and firewall

You can open public ports on the [IP addresses](/documentation/routing/unique-ipv4-ipv6-addresses.html) assigned to the [project](/documentation/overview/projects-and-services-structure.html#project) and point them to any [service and its port](/documentation/routing/routing-between-project-services.html). Each such open public port can be protected by either whitelisting or blacklisting IP addresses.

![IP routing](/ip-routing.png "IP routing")

**Ports 80 and 443 are reserved** and used to [Domain routing](/documentation/routing/using-your-domain.html). Domain routing is the preffered routing method for production applications.
