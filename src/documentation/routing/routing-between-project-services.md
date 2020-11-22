# Internal routing between projects's services

Zerops sets up shared private network for your projects so every service inside the project can see every other service under their respective `hostname`s and ports defined when creating the service. A service can have multiple ports open, running on different protocols.

Ports on [runtime]() services can be changed by the user, ports on databases are predefined by Zerops.

Project is a blackhole, its network doesn't leak outside it, if you need communication through multiple projects, it should be done by settings up [direct IPv6 access]() along with a [firewall]() or by publicly publishing it under a [domain]().

Private routing (hostname and ports) is intially set when creating your service and can be change in the Internal Ports & Public routing tab of your service detail.

![Internal ports](/internal-ports.png "Internal ports")
