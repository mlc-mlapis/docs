# Configuration: zerops.yml

Zerops uses a YAML definition file to build your application. This file, `zerops.yml`, has to be placed at the root directory of your project.

Each `zerops.yml` can contain definitions for one or more applications. It is especially valuable for a monorepo when one repository contains source code for many applications. The appropriate **service hostname** to which the application will be deployed is used to select a correct definition from the `zerops.yml`.

A definition begins with a **service hostname** to which the application will be deployed and consists of two parts: **build** and **run**.

## Example

```yaml
# Service hostname to which the application will be deployed.
nodejsapp:
  # The part used for the build phase to produce a final application runtime.
  build:
    # What technology should be used as a base one for creating a build container.
    base: [nodejs@14]
    # What commands should be run to install additional or custom dependencies.
    prepare:
      - install svg super tool
      - add another cool tool
    # What commands should be run to build the application.
    build:
      - npm i
      - npm run build:production
    # What files and directories should be copied from a build container into a runtime container.
    deploy: [dist, node_modules, package.json]
  # The part used to run the application runtime after a successful deployment.
  run:
    # A command that should start your service.
    start: npm start
```

## Build part and its properties

It is used for the build phase to produce a final application runtime.

### `base` (optional)

List the technologies your build uses. Zerops will use this as a base pack for the build container. **You can skip it if you'd rather install everything yourself or don't need any technology at all.** For example, you can look at the Zerops recipe phpPgAdmin [zerops.yml](https://github.com/zeropsio/recipe-phppgadmin/blob/main/zerops.yml), where the build doesn't need any base technology, just a shell script, to prepare the **phpPgAdmin** runtime that is deployed into a Zerops PHP+Apache service.

#### Supported base packs

##### `nodejs@<10, 12, 14>`

Includes `npm`, `yarn`, `git`, `npx`.

##### `php@<7.3, 7.4, 8.0>`

Includes `composer`, `git`, `php`.

##### `go@<1>`

Includes `go`, `git`.

#### Example of using multiple base packs

```yaml
base: [nodejs@14, go@1]
```

#### Example of using a single base pack

```yaml
base: [php@7.3]
```

### `prepare` (optional)

Specify which commands to invoke to install additional or custom dependencies beyond Zerops base technologies needed by your application build process. The commands usually run only with the first application build. Before running the prepare commands, the application's source code is downloaded into the build container. After the build and the application runtime deployment, your application project is removed, except for the parts defined by the `cache` property, if used. What remains will become the **custom base pack**. It is compared with the previous one, and if not identical, it will become a new one for the next build cycle.

The commands will run again (on top of the original Zerops base pack) with the next build if:

* content of the `prepare` or `cache` properties have been changed,
* you invalidated the existed **custom base pack** through the Zerops GUI.

### `build`

Specify which commands to invoke to produce the final application runtime deployed into a Zerops service. These commands run during each build process from the first to the last.

#### Example using a single shell instance

```yaml
build: |
  npm install
  npm run build
```

#### Example using multiple shell instances

```yaml
build:
  - npm install
  - npm run build
```


## Run part and its properties

Used to run the application runtime after its successful deployment.

### `run`

### `deploy`

Directories and files, produced by your build, which should be deployed to your runtime service. The path starts from the root of your project (location of zerops.yml).

Quotes have to be used when using the `*` syntax to strip paths.

#### Examples of different deploy settings

##### Deploy folder and a file:

```yaml
deploy: [ dist, package.json ]
```

##### Deploy **everything**

```yaml
# deploys everything
deploy: [ '.' ]
```

##### Deploy single file

```yaml
# deploys `path/to/file.txt` including path directories
deploy: [ './path/to/file.txt' ]
```

##### Deploy all files in directory

```yaml
# deploys everything inside `path/to/dir`
# includes the path directories
deploy: [ './path/to/dir/' ]
```

##### Deploy single file, strip directory

```yaml
# deploys `file.txt`
deploy: [ './path/to/*/file.txt' ]
```

##### Deploy all files in directory, strip directory path

```yaml
# deploys everything inside `path/to`
# strip the path directories
deploy: [ './path/to/*' ]
```
