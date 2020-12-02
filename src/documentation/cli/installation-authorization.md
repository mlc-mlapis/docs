# Installation ~~and Authorization~~ 

Zerops zcli is open sourced command line client that is hosted on GitHub ([zeropsio/zcli](https://github.com/zeropsio/zcli)).

<br/>

::: warning ONLY MAC AND LINUX SUPPORTED FOR NOW
Currently zcli is supported only on MacOS and linux (amd64 and i386), windows support is coming. See [roadmap](/documentation/overview/roadmap.html).
:::

<br/>

## Installation

### Using npm

Zerops zcli can be installed using **npm**

```bash
$ npm i -g @zerops/zcli
```

it will be available under the `zcli` command. 

### Static binary

Alternatively zcli binary can be downloaded from [GitHub releases](https://github.com/zeropsio/zcli/releases) but you have to make sure you select proper version corresponding to the system you want to run zcli on.

```bash
# add to PATH to use globally
$ wget -O zcli <github release url>
$ chmod +x zcli
```

