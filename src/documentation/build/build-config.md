---
sidebarDepth: 3
---

# Build Config (zerops.yml)

Zerops uses a YAML definition file to build your application. This file, `zerops.yml`, has to be placed at the root of your project.

## Example

```yaml
# select what technology your build uses
use: [ nodejs@14 ]
# which commands to run to build
run:
  - npm i
  - npm run build:production
# which files / folders to deploy after build
deploy: [ dist, node_modules, package.json ]
```

## Properties

### `use`

List the technologies your build uses. Zerops will use this as a base pack for the build container. Leave this field empty if you prefer to install everything yourself inside the `run` property.

#### Supported base packs:

##### `nodejs@<10, 12, 14>`
Includes `npm`, `yarn`, `git`, `npx`.

##### `php@<7.3, 7.4, 8.0>`
Includes `composer`, `git`, `php`.

##### `go@<1>`
Includes `go`, `git`.

#### Example of `use`

##### Using multiple base packs:

```yaml
use: [ nodejs@14, go@1 ]
```

##### Using a single base packs:
```yaml
use: [ php@7.3 ]
```

##### Using an empty container (install everything yourself):
```yaml
use: []
```

<br />
<br />

---

<br />

### `run`

Specify which commands to `run` to produce your final build file. Use this to install additional dependencies, prepare your files, run build commands.

#### Examples

##### Using single instance:

```yaml
runs: |
  npm install
  npm run build
```

##### Using multiple instances:

```yaml
runs:
  - npm install
  - npm run build
```

<br />
<br />

---

<br />

### `deploy`

Directories and files, produced by your build, which should be deployed to your runtime service. Path starts from the root of your project (location of zerops.yml).

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
