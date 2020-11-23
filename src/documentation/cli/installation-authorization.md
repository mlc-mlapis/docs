# Installation and Authorization

Zerops CLI is open source that is hosted on GitHub ([zeropsio/zcli](https://github.com/zeropsio/zcli)) and build and published through [GitHub Action](https://github.com/zeropsio/zcli/actions?query=workflow%3A%22Upload+build+asset%22).

<br/>

::: warning ONLY MAC AND LINUX SUPPORTED FOR NOW
Currently zcli is supported only on MacOS and linux (amd64 and i386), windows support is coming. See [roadmap]().
:::

<br/>

## Installation

Zerops zcli can be installed using **npm**

```bash
$ npm i -g @zerops/zcli
```

it will then be available under the `zcli` command. List of commmands can be found at available [commands list]().

Alternatively zcli binary can be downloaded from [GitHub releases](https://github.com/zeropsio/zcli/releases) but you have to make sure you select proper version coresponding to the system you want to run zcli on.

```bash
# add to PATH to use globally
$ wget -O zcli <github release url>
$ chmod +x zcli
```

<br/>
<br/>

## Login using Personal Token

If you are using zcli outside of your computer, like in a [GitHub Action]() or [GitLab job]() you might want to use **personal token** to [`login`](), these can be created by clicking your avatar at the right upper corner and going to Token management page.

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
