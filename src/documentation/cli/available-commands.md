# zCLI Available Commands

[[toc]]

## `login`

Should be used after you install **zcli**. You usually only need to log in once per device.

### Login parameters

All login parameters can be used as command line parameters `--parameterName` or environment variables as `PARAMETERNAME`. A command parameter has priority over an environment variable if both equivalents exist.

#### `--zeropsToken`

The personal token you created in the Zerops GUI. The token should be passed preferably as the `ZEROPSTOKEN` environment variable, so that it doesn't show up in logs.

```bash
zcli login --zeropsToken=AC750cs64sas897sabs65sasbbas9asbdbasd65sadNa
```

<!-- markdownlint-disable DOCSMD004 -->
::: tip Personal token value without its flag
You can also use the token value directly without the flag `--zeropsToken=`. zCLI recognizes this case correctly.

```bash
zcli login AC750cs64sas897sabs65sasbbas9asbdbasd65sadNa
```

:::
<!-- markdownlint-enable DOCSMD004 -->

#### `--zeropsLogin`

The e-mail address you used to register your account. Use with your `--zeropsPassword`

```bash
zcli login --zeropsLogin=my@mail.com --zeropsPassword=foobar123
```

#### `--zeropsPassword`

The password you used to register your account. Use with your `--zeropsLogin`. The password should be passed preferably as the `ZEROPSPASSWORD` environment variable, so that it doesn't show up in logs.

```bash
zcli login --zeropsLogin=my@mail.com --zeropsPassword=foobar123
```

<!-- markdownlint-disable DOCSMD004 -->
::: tip Login and password values without their flags
You can also use the e-mail address and password values directly without the flags `--zeropsLogin=` and `--zeropsPassword=`. zCLI recognizes this case correctly.

```bash
zcli login my@mail.com foobar123
```

:::
<!-- markdownlint-enable DOCSMD004 -->

## `push [project name] [service name]`

It can be used to trigger the [build pipeline](/documentation/build/how-zerops-build-works.html) defined in the project's `zerops.yml`. **By default, it will take into account your `.gitignore`**, so the same files you are tracking in your repository will be used to build the application from your local environment.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using quotes
You must enclose the project name into quotes if the it contains a space.
:::
<!-- markdownlint-enable DOCSMD004 -->

### Push parameters

The only one **push** parameter is optional and can be used both as parameter `--parameterName` or be put inside your environment variable as `PARAMETERNAME`. A command parameter has priority over an environment variable if both equivalents exist.

#### `--versionName`

Will be used to name the resulting [deployed](/documentation/deploy/how-deploy-works.html) application version.

```bash
zcli push myproject myservice --versionName="v0.0.1"
```

## `deploy [project name] [service name] [space separated files or directories]`

It is used to deploy directories and files to the Zerops service as an alternative to the [push](#push-project-name-service-name) command. Use when you want to deploy files that are already built by any way directly into a Zerops service.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using quotes
You must enclose the project name into quotes if the it contains a space.
:::
<!-- markdownlint-enable DOCSMD004 -->

<!-- markdownlint-disable DOCSMD004 -->
::: info Using a tilda character to strip a path directory of deployed files
Standard behavior is to copy the directories and files with exactly the same path as they are placed in the source location. If you want to strip the path from the left side, use the tilda (**~**) character. You can strip the entire directory path or only its part from the left.
:::
<!-- markdownlint-enable DOCSMD004 -->

### Example

If, for example, your already built application is located in the folder `dist/app` and you want to deploy the files inside it without the directory path, you can use ==`./dist/app/~/`== pattern.

```bash
zcli deploy myproject myservice ./dist/app/~/
```

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using quotes
You must enclose the pattern into quotes if the directory path contains a space.
:::
<!-- markdownlint-enable DOCSMD004 -->

You can see more pattern examples in the `zerops.yml` [deploy property](/documentation/build/build-config.html#examples-of-different-deploy-settings) documentation. Here, you can use the same patterns (without the enclosed array but with the space as a separator).

## `vpn start [project name]`

Used to establish a secure connection to your protected project network. Requires the `project name` to be defined.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using quotes
You must enclose the project name into quotes if the it contains a space.
:::
<!-- markdownlint-enable DOCSMD004 -->

```bash
zcli vpn start myproject
```

## `vpn stop`

Disconnects the already established VPN connection.

```bash
zcli vpn stop
```

## `vpn status`

Prints the current VPN connection status.

```bash
zcli vpn status
```
