# Deploy Versioning

Each package you [build](/documentation/build/how-zerops-build-works.html) and / or [deploy](/documentation/deploy/how-deploy-works.html) to your [runtime](/documentation/services/runtimes.html) service is archived, allowing you to easily switch between version. However, only one package can be active at a given point in time.

A deploy item is created each time the build pipeline is run. If the build fails, it will be visible on the list. Once you are done fixing your pipeline, you can remove these failed deploys.

Archived Packages are stored for a month.

Deployed packages can be managed in the detail of your runtime service.

![Deploy versioning](/deploy-versioning.png "Deploy versioning")



