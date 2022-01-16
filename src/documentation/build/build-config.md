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
      - apt-get [options] command [pkg]
      - curl [options] url
      - npm i -g package
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

Specify which commands to run to install additional or custom dependencies on top of the Zerops [base](#base-optional) technologies needed by your application build process. The **custom base pack** originating from the **Zerops base pack** and the results of **prepare** commands will be used for the next build pipeline, unless:

* content of the `base` or `prepare` property has been changed,
* you invalidated the existed **custom base pack** through the Zerops GUI (not implemented yet).

If it happens, the latest **Zerops base pack** is used, and the **prepare** commands run again.

### `build`

Specify which commands to run to produce the final application runtime deployed into a Zerops service. These commands run during each build process from the first to the last.

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

### `deploy`

Determines directories and files produced by your build, which should be deployed to your runtime service container. **The path starts from the root directory of your project** (the location of `zerops.yml`).

<!-- markdownlint-disable DOCSMD004 -->
::: info Using a tilda character to strip a path directory
The standard behavior is that the directories and files are copied exactly with the same path as they are placed in the build container. If you want to strip the path from the left side, use the tilda (**~**) character.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### Examples of different deploy settings

##### Deploys a folder, and a file from the project root directory

```yaml
deploy: [dist, package.json]
```

##### Deploys everything

```yaml
deploy: [.]
```

##### Deploys a single file on a path

```yaml
# Deploys `path/to/file.txt`, including the path directories.
deploy: [./path/to/file.txt]
```

##### Deploys all files in a directory on a path

```yaml
# Deploys everything inside `path/to/dir`, including the path directories.
deploy: [./path/to/dir/]
```

##### Deploys a single file on a path, with the path directory stripping

```yaml
# Deploys only `file.txt` without its path directory.
deploy: [./path/to/~/file.txt]
```

##### Deploy all files in a directory, with the path directory stripping

```yaml
# Deploys everything inside `path/to` without the path directories.
deploy: [./path/to/~/]
```

## Run part and its properties

Used to run the application runtime after its successful deployment.

### `run`
