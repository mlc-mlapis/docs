# Authorization

## Login using Personal Token

If you are using zcli outside of your computer, like in a [GitHub Action](/documentation/deploy/use-in-github-actions.html) or [GitLab job](/documentation/deploy/use-in-gitlab-ci.html) you might want to use **personal token** to [`login`](/documentation/cli/installation-authorization.html#login-using-personal-token), these can be created by clicking your avatar at the right upper corner and going to Token management page.

![token management](/token-management.png "token management")

After you create your personal token, you can login using

```bash
$ zcli login --zeropsToken=<personal token>
```

or better yet by adding `ZEROPSTOKEN` to your enviroment variables, in which case the token doesn't need to be passed as a parameter. *This is preffered* and more secure option, as then the token doesn't show up in logs.

```bash
$ zcli login
```

<br/>
<br/>

## Login using E-mail and Password

You can also log in using your email and password.

```bash
$ zcli login --zeropsLogin=<email> --zeropsPassword=<password>
```

or by adding `ZEROPSLOGIN` and `ZEROPSPASSWORD` to your environment variables.

<br/>
<br/>
<br/>

::: tip LOGIN ONLY ONCE
You need to log in only once. Auth token will be saved securely in your `var` folder inside your filesystem.
:::
