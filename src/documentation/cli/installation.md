# Installation

Zerops **zcli** is an open-sourced command-line client based on Node.js that is hosted on GitHub ([github.com/zeropsio/zcli](https://github.com/zeropsio/zcli)), built and published to package managers through a [GitHub Action](https://github.com/zeropsio/zcli/actions?query=workflow%3A%22Upload+build+asset%22). Currently, the **zcli** is supported on **Linux** (x86 & x64 architecture) and **macOS** or **Windows** (only x64 architecture).

<!-- markdownlint-disable DOCSMD004 -->
::: info Built-in VPN functionality is not available in zcli on Windows
 The implementation of a WireGuard based VPN built-in protocol is not ready yet. All data transfer between a local client environment and **Zerops** is encrypted using the secured HTTPS protocol.
:::
<!-- markdownlint-enable DOCSMD004 -->

## How to install

### Using npm

The Zerops **zcli** command-line client can be installed using **npm**

```bash
npm i -g @zerops/zcli
```

and it will be available under the ==`zcli`== command.

### Static binary

Alternatively, the **zcli** binary can be downloaded from [GitHub releases](https://github.com/zeropsio/zcli/releases). You have to select the proper version corresponding to the system you want to run on.

#### macOS x64

```bash
# Modify the PATH appropriately to run it globally.
$ wget https://github.com/zeropsio/zcli/releases/download/<version>/zcli-darwin-amd64 -O zcli
$ chmod +x zcli
```

#### Linux x64

```bash
# Modify the PATH appropriately to run it globally.
$ wget https://github.com/zeropsio/zcli/releases/download/<version>/zcli-linux-amd64 -O zcli
$ chmod +x zcli
```

#### Linux i386

```bash
# Modify the PATH appropriately to run it globally.
$ wget https://github.com/zeropsio/zcli/releases/download/<version>/zcli-linux-i386 -O zcli
$ chmod +x zcli
```

#### Windows x64

```bash
# Modify the PATH appropriately to run it globally.
$ wget https://github.com/zeropsio/zcli/releases/download/<version>/zcli-win-x64.exe -O zcli.exe
```
