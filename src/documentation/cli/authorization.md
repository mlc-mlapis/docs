# Authorization

## Login Using Personal Token

If you are using zcli outside of your computer, as in a [GitHub Action](/documentation/deploy/use-in-github-actions.html) or a [GitLab Job](/documentation/deploy/use-in-gitlab-ci.html) you might want to use a **personal token** to [`log in`](/documentation/cli/installation-authorization.html#login-using-personal-token). These can be created by clicking on your avatar in the right upper corner and going to the Token management page.

![token management](/token-management.png "token management")

After you create your personal token, you can log in using

```bash
$ zcli login --zeropsToken=<personal token>
```

or better yet by adding `ZEROPSTOKEN` to your enviroment variables, in which case the token doesn't need to be passed as a parameter. *This is hte preferred* and more secure option, as the token doesn't show up in logs this way.

```bash
$ zcli login
```

<br/>
<br/>

## Login Using E-mail and Password

You can also log in using your email and password.

```bash
$ zcli login --zeropsLogin=<email> --zeropsPassword=<password>
```

or by adding `ZEROPSLOGIN` and `ZEROPSPASSWORD` to your environment variables.

<br/>
<br/>
<br/>

::: tip LOG IN ONLY ONCE
You need to log in only once. Auth token will be saved in your `~/.config/zerops/cli.data` folder inside your filesystem.
:::
