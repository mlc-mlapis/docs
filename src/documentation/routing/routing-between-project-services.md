# Internal Routing Between Project's Services

Zerops sets up a private network for your project so that every service within the project can see every other service under their respective `hostname`s and ports which are defined when each service is created. A service can have multiple internal ports open, running on udp or tcp protocols.

Ports on [runtime](/documentation/services/runtimes.html) services can be changed by the user in the Internal Ports & Public routing tab of your service detail. Ports on [databases](/documentation/services/databases.html) are predefined by Zerops and cannot be changed.

This private network can be securely accessed using the [VPN](/documentation/cli/vpn.html) capabilities of our [CLI](/documentation/cli/installation-authorization.html).

Public access to each of the project's services can be set up using [direct IPv6 access](/documentation/routing/unique-ipv4-ipv6-addresses.html) along with a [firewall](/documentation/routing/access-through-ip-and-firewall.html) or, if it's a http application, using a [domain](/documentation/routing/using-your-domain.html).

![Internal ports](/internal-ports.png "Internal ports")
