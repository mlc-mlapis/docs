# Installation

Zerops zcli is an open-sourced command line client that is hosted on GitHub ([zeropsio/zcli](https://github.com/zeropsio/zcli)) and built and published to package managers through a [GitHub Action](https://github.com/zeropsio/zcli/actions?query=workflow%3A%22Upload+build+asset%22).

<br/>

::: warning ONLY MAC AND LINUX SUPPORTED FOR NOW
Currently, the zcli is only supported on MacOS and Linux (amd64 and i386), Windows support is coming soon. See our [roadmap](/documentation/overview/roadmap.html) for more information.
:::

<br/>

## Installation

### Using npm

The Zerops zcli can be installed using **npm**

```bash
$ npm i -g @zerops/zcli
```

it will be available under the `zcli` command.

### Static binary

Alternatively, the zcli binary can be downloaded from [GitHub releases](https://github.com/zeropsio/zcli/releases) but you have to make sure you select the proper version corresponding to the system you want to run the zcli on.

```bash
# add to PATH to use globally
$ wget -O zcli <github release url>
$ chmod +x zcli
```
