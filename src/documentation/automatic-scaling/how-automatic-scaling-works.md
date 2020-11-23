# How automatic scaling works

Each [service](/documentation/overview/projects-and-services-structure.html#service) you create starts at non-HA container running on 1 vCPU core with 1 GB RAM and 3 GB of disk space, you get this [for free](/documentation/overview/pricing.html#free-tier-unlimited-projects-and-team-members). Once your application starts requiring more computing power or bigger disk, Zerops will as the first autoscaling step enable [high availability](/documentation/ha/why-should-i-want-high-availability.html). For example your Node.js service will start running on two 1 vCPU / 1GB RAM / 3 GB Disk instead of one, you MongoDB will start running on one master and two slaves, each with 1 vCPU / 1 GB RAM / 3 GB Disk. After that Zerops will scale each metric of each container separately, just as your applications will require, always optimized to run as efficiently as possible.

Zerops will automatically change settings of the services to always run as optimally as possible for given state of horizontal and vertical autoscaling.

### Horizontal scaling

To be done..

### Vertical scaling

To be done..

### Performance tunning

To be done..
