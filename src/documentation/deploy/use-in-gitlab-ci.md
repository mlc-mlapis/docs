# Use in GitLab CD/CI

Our CLI can be [installed](/documentation/cli/installation-authorization.html#installation) on GitLab CI runners, enabling you to integrate deploy to Zerops to your existing actions. It is however preffered to [build](/documentation/build/how-zerops-build-works.html) directly on Zerops, either by connecting your service with a [GitLab repository](/documentation/gitlab/gitlab-integration.html) or by using [push](/documentation/cli/available-commands.html#push-project-name-service-name) command of zcli to trigger the build pipeline.

### Example GitLab Job

See full [zcli](/documentation/cli/available-commands.html) [login](/documentation/cli/available-commands.html#login) and [deploy](/documentation/cli/available-commands.html#deploy-project-name-service-name-files-or-paths) documentation.

```yaml
build_and_deploy:
  script:
    - npm i -g @zerops/zcli
    - npm ci
    - npm run build
    # add ZEROPSTOKEN to your CI/CD env variables
    # at https://docs.gitlab.com/ee/ci/variables/
    # as a safer alternative to --zeropsToken=<token>
    # as your token will not show up in job logs
    - zcli login
    - zcli deploy my-project my-service ./
  only:
    - tag

```
