# Use in GitLab CD/CI

Our zCLI can be [installed](/documentation/cli/installation-authorization.html#installation) on GitLab CI runners, enabling you to integrate deploy to Zerops to your existing actions. It is, however, preferable to [build](/documentation/build/how-zerops-build-works.html) directly on Zerops, either by connecting your service to a [GitLab repository](/documentation/gitlab/gitlab-integration.html) or by using the [push](/documentation/cli/available-commands.html#push-project-name-service-name) command of zCLI to trigger the build pipeline.

### Example: GitLab Job

See full [zCLI](/documentation/cli/available-commands.html) [login](/documentation/cli/available-commands.html#login) and [deploy](/documentation/cli/available-commands.html#deploy-project-name-service-name-space-separated-files-or-directories) documentation.

```yaml
build_and_deploy:
  script:
    # install zerops cli to your runner
    - npm i -g @zerops/zcli
    # build your application
    - npm i
    - npm run build
    # add ZEROPSTOKEN to your CI/CD env variables
    # at https://docs.gitlab.com/ee/ci/variables/
    # as a safer alternative to --zeropsToken=<token>
    # as your token will not show up in job logs
    - zcli login
    # deploy dist folder to service `myapp` of `myproject` project
    - zcli deploy myproject myservice ./dist
  only:
    - tag

```
