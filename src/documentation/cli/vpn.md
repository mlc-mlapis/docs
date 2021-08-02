# VPN to securely connect to your services

The [zcli](/documentation/cli/installation-authorization.html) command-line client has a WireGuard based VPN built in. This means you can connect inside the projects network and locally access your services under their [hostname and ports](/documentation/routing/routing-between-project-services.html).

[**WireGuard**](https://www.wireguard.com) needs to be installed for **zcli vpn** to work. The installation guide for each system can be found on the [website](https://www.wireguard.com/install/). **VPN works as a secure alternative to SSH tunnels.**

<!-- markdownlint-disable DOCSMD004 -->
::: info Built-in VPN functionality is not available in zcli on Windows
 The implementation of a WireGuard based VPN built-in protocol is not ready yet. All data transfer between a local client environment and **Zerops** is encrypted using the secured HTTPS protocol.
:::
<!-- markdownlint-enable DOCSMD004 -->

## Use cases

- Create a clone of your project as your personal development environment. Use **vpn** to locally access your databases without having to have them run locally, which is especially hard if you are developing [high availability](/documentation/ha/why-should-i-want-high-availability.html) enabled applications.

- Use to [restore](/documentation/backup-restore/backup-restore-databases.html) data to your databases.

- Use to locally consume API from applications [deployed](/documentation/build/how-zerops-build-works.html) to Zerops (CMS, rest APIs).
