---
sidebarDepth: 3
---

# Build Config (zerops.yml)

Zerops uses a yaml definition file to build your application. This file, `zerops.yml`, has to be placed at the root of your project.

## Example

```yaml
# select what technology your build uses
use: [ nodejs@13 ]
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

##### `nodejs@<10, 12, 13>`
Includes `npm`, `yarn`, `git`, `npx`.

##### `php@<7.2, 7.3>`
Includes `composer`, `git`, `php`.

##### `go@<1>`
Includes `go`, `git`.

#### Example of `use`

##### Using multiple base packs:

```yaml
use: [ nodejs@13, go@1 ]
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

Directories and files, produced by your build, witch should be [deploy]()ed to your runtime service. Path starts from the root of your project (location of zerops.yml).

#### Examples

##### Deploy folder and a file:

```yaml
deploy: [ dist, package.json ]
```
