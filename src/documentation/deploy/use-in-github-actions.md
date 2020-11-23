# Use in Github Actions

Our CLI can be [installed](/documentation/cli/installation-authorization.html#installation) on GitHub Actions runners, enabling you to integrate deploy to Zerops to your existing actions. It is however preffered to [build](/documentation/build/how-zerops-build-works.html) directly on Zerops, either by connecting your service with a [GitHub repository](/documentation/github/github-integration.html) or by using [push](/documentation/cli/available-commands.html#push-project-name-service-name) command of zcli to trigger the build pipeline.

### Example GitHub Deploy Action

See full [zcli](/documentation/cli/available-commands.html) [login](/documentation/cli/available-commands.html#login) and [deploy](/documentation/cli/available-commands.html#deploy-project-name-service-name-files-or-paths) documentation.

```yaml
name: Build and then deploy to zerops.io

on:
  push:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: install, build, deploy
        env:
          # safer alternative to --zeropsToken=<token>
          # as your token will not show up in job logs
          ZEROPSTOKEN: ${{ secrets.ZEROPSTOKEN }}
        run:
          - npm i -g @zerops/zcli
          - npm ci
          - npm run build
          - zcli login
          - zcli deploy my-project my-app ./dist
```
