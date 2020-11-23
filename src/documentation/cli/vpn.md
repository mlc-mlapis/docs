# VPN to securely connect to your services

[zcli](/documentation/cli/installation-authorization.html) has a wireguard based VPN built in, this mean you can connect inside projects network and locally access your services under their `hostname` and their [ports](/documentation/routing/routing-between-project-services.html).

[**wireguard**](https://www.wireguard.com/) needs to be installed for zcli vpn to work, installation guide for each system can be found on [their website](https://www.wireguard.com/install/).

VPN works as a secure alternative to SSH tunnels.

### Use cases

- create a copy of your project project as your personal development environment, use vpn to be able to locally access your databases without having to have them run locally, which is especially hard, if you are developing [high availability](/documentation/ha/why-should-i-want-high-availability.html) enabled applications.

- use to [restore](/documentation/backup-restore/backup-restore-databases.html) data to your databases

- use to locally consume API from applications [deployed](/documentation/build/how-zerops-build-works.html) to zerops (CMS, rest APIs)
