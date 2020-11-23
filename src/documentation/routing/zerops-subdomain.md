# Zerops Subdomain for previews

Each [service](/documentation/overview/projects-and-services-structure.html#service) running on a [HTTP port](/documentation/routing/routing-between-project-services.html) (mostly [runtimes](/documentation/services/runtimes.html)) is assigned a unique zerops.io sudomain, you can enable this subdomain inside the **Internal Ports & Public Routing** tab in service detail.

![zerops subdomain](/zerops-subdomain.png "zerops subdomain")

Zerops subdomain can't currently be modified.

Zerops subdomain is also stored under a `zeropsSubdomain` key in [environment variables](/documentation/environment-variables/how-to-access.html) of the service.

::: warning NOT FOR PRODUCTION
You **shouldn't** use Zerops subdomain as CNAME for production as it will prevent autoscaling, since the traffic goes thru a global zerops L7 Http Balancer and not directly to your [project](/documentation/overview/projects-and-services-structure.html#project) infrastructure. Instead use [IPv6 address](/documentation/routing/unique-ipv4-ipv6-addresses.html) or request [IPv4 address](/documentation/routing/unique-ipv4-ipv6-addresses.html).
:::
