---
sidebarDepth: 1
---

# Available Commands

[[toc]]

## `login`

Should be used after you install zcli. you usually need to log in only once per device.

### Flags

All login parameters can be used as command line parameters `--parameterName` or enviroment variables as `PARAMETERNAME`

#### `--zeropsToken`

The personal token you created in the Zerops app. The token should be passed preferably as the `ZEROPSTOKEN` environment variable, so that it doesn't show up in logs.

```bash
$ zcli login --zeropsToken=AC750cs64sas897sabs65sasbbas9asbdbasd65sadNa
```

#### `--zeropsLogin`

THe e-mail address you registered your account with. Use alongside your `--zeropsPassword`

```bash
$ zcli login --zeropsLogin=my@mail.com --zeropsPassword=foobar123
```

#### `--zeropsPassword`

The password you registered your account with. Use alongside your `--zeropsLogin`. The password should be passed preferably as the `ZEROPSPASSWORD` environment variable, so that it doesn't show up in logs.

```bash
$ zcli login --zeropsLogin=my@mail.com --zeropsPassword=foobar123
```

---

## `push [project name] [service name]`

Used to trigger build pipeline defined in `zerops.yml`.

### Flags

All push parameters are optional and can be used both as parameter `--parameterName` or be put inside your enviroment variables as `PARAMETERNAME`. **By default, it will take in account your `gitignore`**.

#### `--versionName`

Will be used to name the resulting [deployed](/documentation/deploy/how-deploy-works.html) application version.

```bash
$ zcli push myproject myservice --versionName="v0.0.1"
```

---

## `vpn start [project name]`

Used to establish a secure connection to your project network. Requires the `project name` to be defined.

```bash
$ zcli vpn start <project name>
```

## `vpn stop`

Disconnects the established VPN connection.

```bash
$ zcli vpn stop
```

## `vpn status`

Prints the VPN status

```bash
$ zcli vpn status
```


---

## `deploy [project name] [service name] [files or paths]`

Used to deploy files to the Zerops service. Alternative to `push`, which triggers hte [build pipeline](/documentation/build/how-zerops-build-works.html). Use when you want to deploy already built files to Zerops.

```bash
$ zcli deploy dist package.json
```
