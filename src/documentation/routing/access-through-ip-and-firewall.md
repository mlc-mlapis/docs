# Access your services using IP and firewall

You can open public ports on the [IP addresses](/documentation/routing/unique-ipv4-ipv6-addresses.html) assigned to the [project](/documentation/overview/projects-and-services-structure.html#project) and point them to any [service and its port](/documentation/routing/routing-between-project-services.html).

![IP routing](/ip-routing.png "IP routing")

**Ports 80 and 443 are reserved** if you need to set up access to services communicating on HTTP(s) protocols, please use [Domain routing](/documentation/routing/using-your-domain.html). Which will take care of everything including settup up Let's encrypt certificate.

## Firewall

Each such open public port can be protected by either whitelisting or blacklisting IP addresses. Either single IP address or whole IP ranges can be white/blacklisted using [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) format.

![Firewall](/firewall.png "Firewall")
