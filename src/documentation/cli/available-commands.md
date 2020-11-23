---
sidebarDepth: 1
---

# Available commands

[[toc]]

## `login`

Should be used after you install zcli you usually need to login only once per a device.

### Flags

All login parameters can be used as both parameter `--parameterName` or be put inside your enviroment variables as `PARAMETERNAME`

#### `zeropsToken`

Personal token you created in zerops app. Token should be passed preferably as `ZEROPSTOKEN` environment variable, so it doesn't show up in logs.

```bash
$ zcli login --zeropsToken=my@mail.com --zeropsPassword=foobar123
```

#### `zeropsLogin`

E-mail address you registered your account with. Use alongside `zeropsPassword`

```bash
$ zcli login --zeropsLogin=my@mail.com --zeropsPassword=foobar123
```

#### `zeropsPassword`

Password you registered your account with. Use alongside `zeropsLogin`. Pasword should be passed preferably as `ZEROPSPASSWORD` environment variable, so it doesn't show up in logs.

```bash
$ zcli login --zeropsLogin=my@mail.com --zeropsPassword=foobar123
```

---

## `push`

Used to trigger build pipeline defined in `zerops.yml`, by default it will take in account your `gitignore`.


### Attributes

Have be be in this exact order, both required.

#### `project name`

Name of the project.

```bash
$ zcli push myproject myservice --versionName="v0.0.1"
```


#### `service name`

Name of the service.

```bash
$ zcli push myproject myservice --versionName="v0.0.1"
```


### Flags

All push parameters are optional and can be used as both parameter `--parameterName` or be put inside your enviroment variables as `PARAMETERNAME`

#### `versionName`

Will be used to name the resulting [deploy]() inside the GUI.

```bash
$ zcli push myproject myservice --versionName="v0.0.1"
```

---

## `vpn`

Used to securely connect / disconnect into a Zerops project network.

### Commands

#### `start <project name>`

Used to securely connect into project network, requires `project name` to be defined.

```bash
$ zcli vpn start <project name>
```

#### `stop`

Disconnects from the project.

```bash
$ zcli vpn stop
```

#### `status`

Prints vpn status

```bash
$ zcli vpn status
```
