# Internal routing between projects's services

Zerops sets up private network for your project so every service inside the project can see every other service under their respective `hostname`s and ports defined when creating the service. A service can have multiple internal ports open, running on udp or tcp protocols.

Ports on [runtime](/documentation/services/runtimes.html) services can be changed by the user in the Internal Ports & Public routing tab of your service detail. Ports on [databases](/documentation/services/databases.html) are predefined by Zerops and can not be changed.

This private network can be securely accessed using [VPN](/documentation/cli/vpn.html) capabilities of our [CLI](/documentation/cli/installation-authorization.html).

Public access to each of project's services can be set up using up [direct IPv6 access](/documentation/routing/unique-ipv4-ipv6-addresses.html) along with a [firewall](/documentation/routing/access-through-ip-and-firewall.html) or, if it's a http application, under a [domain](/documentation/routing/using-your-domain.html), if it's a .

![Internal ports](/internal-ports.png "Internal ports")
