# Deploy versioning

Each package you [`build`]() and / or [`deploy`]() to your [runtime]() service is archived, alowing you to switch between version on the fly. Only one package can be active at the time.

A deploy item is created each time build pipeline is ran, if the build fails, it will be visible in the list. Once you are done fixing your pipeline, you can remove these failed deploys.

Archived Packages are kept for a month.

Deployed packages can be managed in the detail of your runtime service.

![Deploy versioning](/deploy-versioning.png "Deploy versioning")



