# Configuration: zerops.yml

[[toc]]

Zerops uses a YAML definition file to build your application. This file, `zerops.yml`, has to be placed at the root directory of your project.

Each `zerops.yml` can contain definitions for one or more applications. It is especially valuable for a monorepo when one repository contains source code for many applications. The appropriate **service hostname** to which the application will be deployed is used to select a correct definition from the `zerops.yml`.

A definition begins with a **service hostname** to which the application will be deployed and consists of two parts: **build** and **run**. The `build` part is always required. The `run` part is optional except for the Zerops services **PHP/Apache**, **Node.js**, and **Golang**.

## Example

```yaml
# Service hostname to which the application will be deployed.
nodejsapp:
  # The part used for the build phase to produce a final application runtime.
  build:
    # What technology should be used as a base one for creating a build container.
    base: [nodejs@14]
    # Which commands should be run to install additional or custom dependencies.
    prepare:
      - apt-get [options] command [pkg]
      - curl [options] url
      - npm i -g package
    # Which commands should be run to build the application.
    build:
      - npm i
      - npm run build:production
    # Which files or directories of the application build should be stored for the next build.
    cache: [node_modules]
    # Which files and directories should be copied from a build container into a runtime container.
    deploy: [dist, node_modules, package.json]
  # The part used to run the application runtime after a successful deployment.
  run:
    # Which commands should be run to install additional libraries or tools.
    prepare:
      - apt-get [options] command [pkg]
      - curl [options] url
      - npm i -g package
    # Which commands to run after a launch or each restart of a runtime container instance.
    init:
      - <command> <options>
    # A command that should start your service.
    start: npm start
```

## Build part and its properties

It is used for the build phase to produce a final application runtime.

### `base` (optional)

List Zerops technologies your build uses as the **Zerops build base image** for the build container. **You can skip it if you'd rather install everything yourself or don't need any technology at all.** For example, you can look at the Zerops recipe phpPgAdmin [zerops.yml](https://github.com/zeropsio/recipe-phppgadmin/blob/main/zerops.yml), where the build doesn't need any base technology, just a shell script, to prepare the **phpPgAdmin** runtime that is deployed into a Zerops PHP/Apache service.

#### Supported base images

##### `nodejs@<10, 12, 14>`

Includes `npm`, `yarn`, `git`, `npx`.

##### `php@<7.3, 7.4, 8.0>`

Includes `composer`, `git`, `php`.

##### `go@<1>`

Includes `go`, `git`.

#### Example of using multiple base images

```yaml
base: [nodejs@14, go@1]
```

#### Example of using a single base image

```yaml
base: [php@7.3]
```

### `prepare` (optional)

Specify which commands to run to install additional or custom dependencies on top of the Zerops [base](#base-optional) technologies needed by your application build process. The **custom build image** originating from the **Zerops build base image** and the results of **prepare** commands will be used for the next build pipeline, unless:

* content of the `base` or `prepare` property has been changed,
* you invalidated the existed **custom build image** through the Zerops GUI (not implemented yet).

If it happens, the latest **Zerops build base image** is used, and the **prepare** commands run again.

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

### `cache` (optional)

Allows defining files or directories of the deployed application runtime stored as a cache for the next build. **The path starts from the root directory of your project** (the location of `zerops.yml`). The reason is to optimize and reduce the build time. The already stored cache from a previous build is only updated when the current one is different.

#### Example of the cache using

```yaml
# Allows to reuse previously installed Node.js dependency modules.
cache: [node_modules]
```

### `deploy`

Determines directories and files produced by your build, which should be deployed to your runtime service container. **The path starts from the root directory of your project** (the location of `zerops.yml`).

<!-- markdownlint-disable DOCSMD004 -->
::: info Using a tilda character to strip a path directory
The standard behavior is that the directories and files are copied exactly with the same path as they are placed in the build container. If you want to strip the path from the left side, use the tilda (**~**) character. You can strip the entire directory path or only its part from the left.
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

##### Deploys a single file on a path, with the entire path directory stripping

```yaml
# Deploys only `file.txt` without its path directory.
deploy: [./path/to/~/file.txt]
```

##### Deploys a single file on a path, with the partial path directory stripping

```yaml
# Deploys only `to/file.txt`, the partial path directory stripping.
deploy: [./path/~/to/file.txt]
```

##### Deploy all files in a directory, with the entire path directory stripping

```yaml
# Deploys everything inside `path/to` without the path directories.
deploy: [./path/to/~/]
```

##### Deploy all files in a directory, with the partial path directory stripping

```yaml
# Deploys everything inside `path/to` with the partial path directory stripping.
# The deployed result will be the everything inside the `to` directory.
deploy: [./path/~/to/]
```

## Run part and its properties

It is either used to customize one of the Zerops runtime services [Node.js](/documentation/services/runtimes/nodejs.html), [Golang](/documentation/services/runtimes/golang.html), [PHP](/documentation/services/runtimes/php.html), and [Static server Nginx](/documentation/services/static-servers/nginx.html) technology used as a **Zerops runtime image** for the runtime container or specifying some properties specific for a selected Zerops runtime service.

### `prepare` (optional for all services)

Specify which commands to run to install additional libraries or tools on top of the selected Zerops runtime service technology. The **custom runtime image** originating from the **Zerops runtime image** and the results of **prepare** commands will be used as the next runtime environment, unless:

* content of the `prepare` property has been changed,
* you invalidated the existed **custom runtime image** through the Zerops GUI (not implemented yet).

If it happens, the latest **Zerops runtime image** is used, and the **prepare** commands run again.

### `init` (optional for all services)

Specify which commands to run after a launch or each restart of a runtime container instance and after `prepare` commands if they exist, for example, initialization or removing a custom application cache.

### `start` (required only for Node.js or Golang services)

A command that should start your service. This command will be executed in each container after finishing all `init` commands. This is related only to the [Node.js](/documentation/services/runtimes/nodejs.html) and [Golang](/documentation/services/runtimes/golang.html) service.

### `documentRoot` (required only for PHP/Apache service)

The value represents a folder name used as the root of the publicly accessible web server content, usually the location of your `index.php`. This is related only to the [PHP/Apache](/documentation/services/runtimes/php.html) service.
