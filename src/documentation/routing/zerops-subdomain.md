# Zerops Subdomain for previews

Each [service]() running on a [HTTP port]() (mostly [runtimes]()) is assigned a unique zerops.io sudomain, you can enable this subdomain inside the **Internal Ports & Public Routing** tab in service detail.

![zerops subdomain](/zerops-subdomain.png "zerops subdomain")

Zerops subdomain can't currently be modified.

Zerops subdomain is also stored under a `zeropsSubdomain` key in [environment variables]() of the service.

::: warning NOT FOR PRODUCTION
You **shouldn't** use Zerops subdomain as CNAME for production as it will prevent autoscaling, since the traffic goes thru a global zerops L7 Http Balancer and not directly to your [project]() infrastructure. Instead use [IPv6 address]() or request [IPv4 address]().
:::
