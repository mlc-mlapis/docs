# Use in Gitlab CD/CI

Our CLI can be [installed]() on GitLab CI runners, enabling you to integrate deploy to Zerops to your existing jobs. It is however preffered to [build]() directly on Zerops, either by [connecting]() your service with a GitLab repository or by using [push]() command of zcli to trigger the build pipeline.

### Example GitLab Job

See full [zcli]() [login]() and [deploy]() documentation.

```yaml
build_and_deploy:
  script:
    - npm i -g @zerops/zcli
    # add ZEROPSTOKEN to your CI/CD env variables
    # at https://docs.gitlab.com/ee/ci/variables/
    # as a safer alternative to --zeropsToken=<token>
    # as your token will not show up in job logs
    - zcli login
    - zcli deploy my-project my-service ./
  only:
    - tag

```
