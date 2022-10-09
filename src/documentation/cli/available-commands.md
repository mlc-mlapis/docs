# zCLI Available Commands

[[toc]]

<!-- 
## `region list`

Lists all available Zerops regions, i.e., the location of data centers where Zerops is operated.
 -->

## `login [flags]`

Should be used after you install **zcli**. You usually only need to log in once per device. You can use one of the two equivalent ways: a personal access token or your registered email address and a password.

### login flags

```bash
zcli login --zeropsToken=<token>
```

or

```bash
zcli login --zeropsLogin=<email> --zeropsPassword=<password>
```

All login flags can be used as command line parameters `--flagName` or environment variables as `FLAGNAME`. A command flag has priority over an environment variable if both equivalents exist.

#### `--zeropsToken`

The [personal access token](/documentation/cli/authorization.html#login-using-personal-access-token) you created in the Zerops GUI. It's preferable that the token is passed as the `ZEROPSTOKEN` environment variable, so that it doesn't show up in logs for security reasons.

```bash
zcli login --zeropsToken=AC750cs64sas897sabs65sasbbas9asbdbasd65sadNa
```

<!-- markdownlint-disable DOCSMD004 -->
::: tip Personal access token value without its flag
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

The password you used to register your account. Use with your `--zeropsLogin`. It is preferable that the password is passed as the `ZEROPSPASSWORD` environment variable, so that it doesn't show up in logs.

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

## `vpn start [project name or project id]`

Used to establish a secure connection to your protected project network.

### vpn start parameters

#### `project name` or `project id` for the vpn start command

The required parameter `project name` or `project id` has to be always defined. It specifies the project to which you want to connect. Because projects' names are not unique through all projects a user has access to (projects' ids are unique), there are cases when it's necessary to use a project's id instead of the project's name. If there are two or more projects with the same name and you try to use it as the parameter, the error message `found multiple projects with the same name` appears, together with showing their available IDs.

Another way to get directly the appropriate project's id is through Zerops GUI and automatically generated helper [environment variable](/documentation/environment-variables/helper-variables.html) `projectId` that is available for each Zerops service.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using quotes
You must enclose the project name in quotes if it contains a space.
:::
<!-- markdownlint-enable DOCSMD004 -->

<!-- markdownlint-disable DOCSMD004 -->
::: warning Other WireGuard running processes
The command `zcli vpn start` should only be run in an environment where no other WireGuard processes are running, otherwise we do not guarantee proper functionality.
:::
<!-- markdownlint-enable DOCSMD004 -->

```bash
zcli vpn start myproject
```

or

```bash
zcli vpn start bKSocWoDToSF9QmaAIbtjg
```

## `vpn stop`

Disconnects the established VPN connection.

```bash
zcli vpn stop
```

## `vpn status`

Prints the current VPN connection status.

```bash
zcli vpn status
```

## `push [project name or project id] [service name] [flags]`

It can be used to trigger the [build pipeline](/documentation/build/how-zerops-build-works.html) defined in the project's `zerops.yml`. **By default, it will take into account your `.gitignore`**, therefore the same files that you are tracking in your repository will be used to build the application from your local environment.

### push parameters

#### `project name` or `project id` for the push command

The required parameter `project name` or `project id` has to be always defined. Specifies the project where the Zerops service is located for which the build pipeline should be run. Details about this parameter are the same as for [vpn start parameters](#project-name-or-project-id-for-the-vpn-start-command).

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using quotes
You must enclose the project name in quotes if it contains a space.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### `service name` for the push command

The required parameter `service name` has to be always defined. Specifies the Zerops service for which the build pipeline should be run.

### push flags

Only one **push** flag is optional and can be used both as a command line flag `--flagName` or can be put inside your environment variable as `FLAGNAME`. A command flag has priority over an environment variable if both equivalents exist.

#### `--versionName` for the push command

Will be used to name the resulting [deployed](/documentation/deploy/how-deploy-works.html) application version.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using quotes
You must enclose the version name in quotes if it contains a space.
:::
<!-- markdownlint-enable DOCSMD004 -->

```bash
zcli push myproject myservice --versionName=v0.0.1
```

or

```bash
zcli push bKSocWoDToSF9QmaAIbtjg myservice --versionName=v0.0.1
```

## `deploy [project name or project id] [service name] [space separated files or directories] [flags]`

It is used to deploy directories and files to the Zerops service as an alternative to the [push](#push-project-name-or-project-id-service-name-flags) command. Use when you want to deploy files that have already built by any means directly into a Zerops service runtime container. In such a case, you don't need the `zerops.yml` configuration file.

### deploy parameters

#### `project name` or `project id` for the deploy command

The required parameter `project name` or `project id` has to be always defined. Specifies the project where the Zerops service is located to which the directories and files should be deployed. Details about this parameter are the same as for [vpn start parameters](#project-name-or-project-id-for-the-vpn-start-command).

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using quotes
You must enclose the project name in quotes if it contains a space.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### `service name` for the deploy command

The required parameter `service name` has to be always defined. Specifies the Zerops service to which the directories and files should be deployed.

#### `space separated files or directories` for the deploy command

One or more files or directories separated by a space that you want to deploy to a specified Zerops service. Their paths should be relative to the project root directory in which you invoke the deploy command.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using a tilda character to strip a path directory of deployed files
Standard behavior is to copy the directories and files with exactly the same path as they are placed in the source location. If you want to strip the path from the left side, use the tilda (**~**) character. You can strip the entire directory path or only its part from the left.
:::
<!-- markdownlint-enable DOCSMD004 -->

### Example

If, for example, your built application is located in the folder `dist/app` and you want to deploy the files inside it without the directory path, you can use ==`./dist/app/~/`== pattern.

```bash
zcli deploy myproject myservice ./dist/app/~/
```

or

```bash
zcli deploy bKSocWoDToSF9QmaAIbtjg myservice ./dist/app/~/
```

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using quotes
You must enclose the pattern in quotes if the directory path contains a space.
:::
<!-- markdownlint-enable DOCSMD004 -->

You can see more pattern examples in the `zerops.yml` [deploy property](/documentation/build/build-config.html#examples-of-different-deploy-settings) documentation. Here, you can use the same patterns (without the enclosed array but with a space as a separator).

### deploy flags

Only one **deploy** flag is optional and can be used both as a command line flag `--flagName` or can be put inside your environment variable as `FLAGNAME`. A command flag has priority over an environment variable if both equivalents exist.

#### `--versionName` for the deploy command

Will be used to name the resulting [deployed](/documentation/deploy/how-deploy-works.html) application version.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using quotes
You must enclose the version name in quotes if it contains a space.
:::
<!-- markdownlint-enable DOCSMD004 -->

```bash
zcli deploy myproject myservice --versionName=v0.0.1 ./dist/app/~/
```

or

```bash
zcli deploy bKSocWoDToSF9QmaAIbtjg myservice --versionName=v0.0.1 ./dist/app/~/
```

## `service [command]`

It represents a group of commands for managing individual Zerops services. Generally, there are the following commands:

[`import`](#import-project-name-or-project-id-path-to-import-script-file) Allows creating one or more Zerops services in an existing project via [import scripts](/documentation/export-import/project-service-export-import.html#services). Services are automatically started after they are created.

[`start`](start-project-name-or-project-id-service-name) Starts an existing stopped Zerops service.

[`stop`](stop-project-name-or-project-id-service-name) Stops an existing active Zerops service.

[`delete`](delete-project-name-or-project-id-service-name) Deletes an existing stopped or active Zerops service.

[`log`](log-project-name-or-project-id-service-name-flags) Getting a Zerops service runtime or build log.

### Common service command parameters

#### `project name or project id` for the service commands

The required parameter `project name` or `project id` has to be always defined. Specifies the project which is related to individual executed commands. Details about this parameter are the same as for [vpn start parameters](#project-name-or-project-id-for-the-vpn-start-command).

<!-- markdownlint-disable DOCSMD004 -->
::: tip Using quotes
You must enclose the project name in quotes if it contains a space.
:::
<!-- markdownlint-enable DOCSMD004 -->

### `import [project name or project id] [path to import script file]`

#### Specific service import parameters

##### `path to import script file` for the import command

The path to the [import YAML script](/documentation/export-import/project-service-export-import.html#services) that should be processed. It can be relative to the current directory in which you invoke the import command or an absolute one.

```bash
zcli service import myproject import.yml
```

```yml
# import.yml
services:
- hostname: db
  type: mariadb@10.4
  mode: NON_HA
- hostname: app
  type: nodejs@14
  minContainers: 1
  ports:
  - port: 3000
    httpSupport: true
```

### `start [project name or project id] [service name]`

#### Specific service start parameters

#### `service name` for the service start command

The required parameter `service name` has to be always defined. Specifies the Zerops service to which the directories and files should be deployed.

### `stop [project name or project id] [service name]`

#### Specific service stop parameters

### `delete [project name or project id] [service name]`

#### Specific service delete parameters

### `log [project name or project id] [service name] [flags]`

#### Specific service log parameters

#### log flags
