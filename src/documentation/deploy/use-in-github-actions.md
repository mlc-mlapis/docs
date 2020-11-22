# Use in Github Actions

Our CLI can be [installed]() on GitHub Actions runners, enabling you to integrate deploy to Zerops to your existing actions. It is however preffered to [build]() directly on Zerops, either by [connecting]() your service with a GitHub repository or by using [push]() command of zcli to trigger the build pipeline.

### Example GitHub Deploy Action

See full [zcli]() [login]() and [deploy]() documentation.

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
