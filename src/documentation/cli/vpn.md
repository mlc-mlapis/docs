# VPN to securely connect to your services

[zcli]() has a wireguard based VPN built in, this mean you can connect inside projects network and locally access your services under their `hostname` and their [ports]().

[**wireguard**](https://www.wireguard.com/) needs to be installed for zcli vpn to work, installation guide for each system can be found on [their website](https://www.wireguard.com/install/).

VPN works as a secure alternative to SSH tunnels.

### Use cases

- create a copy of your project project as your personal development environment, use vpn to be able to locally access your databases without having to have them run locally, which is especially hard, if you are developing [high availability]() enabled applications.

- use to [restore]() data to your databases

- use to locally consume API from applications [deployed]() to zerops (CMS, rest APIs)
