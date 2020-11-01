---
sidebarDepth: 3
---

# Build config (zerops.yml)

Zerops uses a yaml definition file to build your application. This file, `zerops.yml` has to be placed at the root of your project.

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

### `uses`

List which technologies your build uses zerops will, zerops will it as a base pack for the [build container](). Leave empty, if you can to install everything yourself inside the `run` property.

#### Supported base packs:

##### `nodejs@<10, 12, 13>`
Includes `npm`, `yarn`, `git`, `npx`.

##### `php@<7.2, 7.3>`
Includes `composer`, `git`, `php`.

##### `go@<1>`
Includes `go`, `git`.

#### Example of `uses`

##### Uses multiple base packs:

```yaml
uses: [ nodejs@13, go@1 ]
```

##### Using a single base packs:
```yaml
uses: [ php@7.3 ]
```

##### Using empty container (install everything yourself):
```yaml
uses: []
```

<br />
<br />

---

<br />

### `run`

Which commands to `run` to produce you final build file. Use to install additional dependencies, prepare your files, run build commands.

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

Which of the files producted by your build should be [deploy]()ed to your runtime service. Path starts from the root (location of zerops.yml).

#### Examples

##### Deploy folder and a file:

```yaml
deploy: [ dist, package.json ]
```

<br/>
<br/>
<br/>
<br/>

::: tip WIP
TODO other examples
:::
