---
sidebarDepth: 1
---

# Available commands

[[toc]]

## `login`

Should be used after you install zcli you usually need to login only once per a device.

### Flags

All login parameters can be used as command line parameter `--parameterName` or enviroment variables as `PARAMETERNAME`

#### `--zeropsToken`

Personal token you created in zerops app. Token should be passed preferably as `ZEROPSTOKEN` environment variable, so it doesn't show up in logs.

```bash
$ zcli login --zeropsToken=AC750cs64sas897sabs65sasbbas9asbdbasd65sadNa
```

#### `--zeropsLogin`

E-mail address you registered your account with. Use alongside `--zeropsPassword`

```bash
$ zcli login --zeropsLogin=my@mail.com --zeropsPassword=foobar123
```

#### `--zeropsPassword`

Password you registered your account with. Use alongside `--zeropsLogin`. Password should be passed preferably as `ZEROPSPASSWORD` environment variable, so it doesn't show up in logs.

```bash
$ zcli login --zeropsLogin=my@mail.com --zeropsPassword=foobar123
```

---

## `push [project name] [service name]`

Used to trigger build pipeline defined in `zerops.yml`.

### Flags

All push parameters are optional and can be used as both parameter `--parameterName` or be put inside your enviroment variables as `PARAMETERNAME`

#### `--versionName`

Will be used to name the resulting [deploy](/documentation/deploy/how-deploy-works.html) application version.

```bash
$ zcli push myproject myservice --versionName="v0.0.1"
```

---

## `vpn start [project name]`

Used to establish secure connection into your project network. Requires `project name` to be defined.

```bash
$ zcli vpn start <project name>
```

## `vpn stop`

Disconnects actually established vpn connection.

```bash
$ zcli vpn stop
```

## `vpn status`

Prints vpn status

```bash
$ zcli vpn status
```


---

## `deploy [project name] [service name] [files or paths]`

Used to deploy files to zerops service.
 
??? Internally is used after [build pipeline](/documentation/build/how-zerops-build-works.html) finishes.

