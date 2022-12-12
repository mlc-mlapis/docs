# Import functions and modifiers

The Zerops [YAML import scripts](/documentation/export-import/project-service-export-import.html#yaml-specification) allow you to create and instantiate the entire Zerops projects or selected services with one click in Zerops GUI or even fully automate necessary steps via the [zCLI import command](/documentation/cli/available-commands.html#path-to-import-script-file-for-the-import-command). They are certainly simple and great ways to manage many real cases effectively.

But there could be moments when you either need to dynamically generate some extra data, like random values, passwords, and public/private keys and store them for later reuse in the script or somehow transform already existing values.

For such cases, Zerops offers to use a pre-defined set of import functions and modifiers.

[[TOC]]

## Import functions

### Building blocks of the syntax notation of function expressions

| Sequence|Description                                                                  |
|--------:|:----------------------------------------------------------------------------|
|     `<@`|Identifier of the beginning of the function expression syntax.               |
|      `(`|Identifier of the beginning of the function parameters.                      |
|      `)`|Identifier of the end of the function parameters.                            |
|      `,`|Function parameters delimiter.                                               |
|      `<`|Identifier of the beginning of a string constant (without @).                |
|      `>`|Identifier of the end of a string constant or the function expression syntax.|
|     `${`|Identifier of the beginning of an environment variable reference.            |
|      `}`|Identifier of the end of an environment variable reference.                  |
|      `\`|Escaping character.                                                          |
|   `\<>|`|Characters that need to be escaped to print them out.                        |

### Data types of function parameters

Functions generally support 2 types of parameters.

#### Static string constants

* Value is enclosed in `<` and `>` characters.
* Spaces between `<` and `>` are NOT trimmed.
* The value is passed into the function always as a string.

#### Variable reference names (previously stored as internal variables)

* Internal variables can be stored using [setVar](#setvar), [generateRandomStringVar](#generaterandomstringvar), [generateED25519Key](#generateed25519key), [generateRSA2048Key](#generatersa2048key), and [generateRSA4096Key](#generatersa4096key) functions.
* Variable reference name is a string constant NOT enclosed in `<` and `>` characters.
* Variable reference names are case-sensitive.
* Spaces before and after the reference name are trimmed.
* Stored value under an internal variable name is looked up and passed into the function as a string.
* If no value is found, an error is returned.

### Data types of function output values

The **string** is the only data type of all function output values.

### Nesting of string constants and function calls

Function calls and string constants may be nested even multiple layers deep.

#### Examples of nesting used in environment variable expressions

```yaml
services:
- hostname: app
  type: nodejs@16
  minContainers: 1
  ports:
  - port: 3000
    httpSupport: true
  envVariables:
    NESTED_STRINGS: <Base and <Nested> content>
    NESTED_FUNCTIONS: <@generateRandomString(<@generateRandomInt(<20>, <50>)>)>
    EVEN_MORE_NESTING: <@setVar(<refVarName>, <@generateRandomString(<@generateRandomInt(<20>, <30>)>)>)>
```

#### Outputs of nesting used in environment variable expressions

```yaml
services:
- hostname: app
  type: nodejs@16
  minContainers: 1
  ports:
  - port: 3000
    httpSupport: true
  envVariables:
    NESTED_STRINGS: "Base and Nested content"
    NESTED_FUNCTIONS: "58580f0ad377a8e4c0dccc1622e2d3812b90"
    EVEN_MORE_NESTING: "73bcd2b647293dd04674cdecc"
```

### Escaping to print out reserved characters

Reserved characters `\<>|` have to be escaped using the `\` backslash to print them out. It's mandatory to escape the `\` character itself.

⚠️ There is one caveat with our processing of the YAML import script because we are parsing the script twice. The first time when evaluating functions and string constants, and the second time when parsing the final YAML composed structure. In each phase, one escaping level of the backslash is done, meaning that each removes one `\`. That's why the `\` character has to be escaped twice (`\\\\` instead of `\\`) to print out `\` on the output finally.

It means that if `ESCAPED_VALUE = <\\\\>` is used, the final value stored in the environment variable will be just `\`.

### Examples of correct function expressions

```yaml
# Function will receive one parameter as the string constant value of: 30
<@functionName(<30>)>
# Function will receive two parameters as the string constant values of: 200 and 1000
<@functionName(<200>, <1000>)>
# It's possible to nest functions one into the other.
<@functionName(<@functionName(<200>, <1000>)>)>
# Using commas inside a string constant passed as the parameter is possible.
<@functionName(<By the way, this is text passed over as a value.>)>
# Referenced environment variables will be evaluated before the parameter is composed.
# If the environment variable envName contains the value: STAGE,
# the passed value of the parameter is a string constant.
<@functionName(<DB_${envName}_HOST>)> # Evaluated to: <@functionName(<DB_STAGE_HOST>)>
# Function will receive one parameter as the internal variable reference: DB_HOST
# Its value is passed as a string if such an internal variable exists. If not, an error returns.
<@functionName(DB_HOST)>
# Referenced environment variables will be evaluated before the parameter is composed.
# If the environment variable envName contains the value: STAGE,
# the passed value of the parameter is a reference to the internal variable.
<@functionName(DB_${envName}_HOST)> # Evaluated to: <@functionName(DB_STAGE_HOST)>
# Examples of escaped function expressions:
\<@functionName(30)\>                  # Output: <@functionName(30)>
\<@functionName(\<30\>)\>              # Output: <@functionName(<30>)>
\<@functionName(\<30\>, \<80\>)\>      # Output: <@functionName(<30>, <80>)>
\<@functionName(\<30\>\, \<80\>)\>     # Output: <@functionName(<30>, <80>)>
\<@functionName(<30>, <80>)\>          # Output: <@functionName(30, 80)>
```

### List of import functions

<!-- markdownlint-disable DOCSMD004 -->
::: tip Internal processing of function parameters
The **string** is the only data type of all input parameters. Those input parameters that logically represent numbers, as in the case of the [generateRandomString](#generaterandomstring) function, are internally converted to numbers.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### generateRandomString

|           Description:|Generates a random string in the required length. The output contains only a combination of `a-zA-Z0-9` characters.                           |
|----------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------|
|        Syntax example:|`<@generateRandomString(<10>)>`                                                                                                               |
|            Parameters:|                                                                                                                                              |
|            `<length>`:|Required length of the string to be generated in characters (maximum allowed value is 1024).                                                  |
|        Returned value:|hR5hS79H4p                                                                                                                                    |

#### generateRandomInt

|           Description:|Generates internally a random integer from the required range (including marginal values).                                                    |
|----------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------|
|        Syntax example:|`<@generateRandomInt(<200>, <1000>)>`                                                                                                         |
|            Parameters:|                                                                                                                                              |
|               `<min>`:|Required minimum (inclusive) as a big signed integer (from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807).                          |
|               `<max>`:|Required maximum (inclusive) as a big signed integer (from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807).                          |
|        Returned value:|823                                                                                                                                           |

#### pickRandom

|           Description:|Selects one of the provided parameters in random order.                                                                                       |
|----------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------|
|        Syntax example:|`<@pickRandom(<640>, <800>, <1024>, <1280>, <1440>, <1920>)>`                                                                                 |
|            Parameters:|                                                                                                                                              |
|         `<...params>`:|The required parameters from which the selection will be made.                                                                                |
|        Returned value:|1024                                                                                                                                          |

#### setVar

|           Description:|Stores the provided content for later use under the specified internal variable name. The content is also returned as output.                                                    |
|----------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        Syntax example:|`<@setVar(<plainPassword>, <@generateRandomString(<16>)>)>`                                                                                                                      |
|            Parameters:|                                                                                                                                                                                 |
|           `<varName>`:|The required parameter of the internal variable name under which the provided content can be retrieved later using [getVar](#getvar) function. The chosen name is case-sensitive.|
|           `<content>`:|Any text you want to be stored, including composition using functions. Already existing variable with the same name is overwritten.                                              |
|        Returned value:|N4KdtM41WskS74wx                                                                                                                                                                 |

#### getVar

|           Description:|Retrieves the previously stored content under the specified variable name. If the variable name is not found, an error is returned.                       |
|----------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
|        Syntax example:|`<@getVar(plainPassword)>`                                                                                                                                |
|            Parameters:|                                                                                                                                                          |
|             `varName`:|The required parameter of the internal variable name that is case-sensitive.. The parameter is used as a reference, so it MUST NOT be enclosed in < and >.|
|        Returned value:|N4KdtM41WskS74wx                                                                                                                                          |

#### generateRandomStringVar

|           Description:|Generates a random string in the required length and stores it also for later use under the specified internal variable name. The output contains only a combination of `a-zA-Z0-9` characters. |
|----------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        Syntax example:|`<@generateRandomStringVar(<plainPassword>, <10>)>`                                                                                                                                             |
|            Parameters:|                                                                                                                                                                                                |
|           `<varName>`:|The required parameter of the internal variable name under which the provided content can be retrieved later using [getVar](#getvar) function. The chosen name is case-sensitive.               |
|            `<length>`:|Required length of the string to be generated in characters (maximum allowed value is 1024).                                                                                                    |
|        Returned value:|hR5hS79H4p                                                                                                                                                                                      |

#### getDateTime

|           Description:|Returns the current date and time in a [specified mask pattern](#possible-mask-patterns-to-date-and-time-formatting) and a chosen timezone.                                                     |
|----------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        Syntax example:|`<@getDatetime(<DD.MM.YYYY HH:mm:ss>, <CET>)>`                                                                                                                                                  |
|            Parameters:|                                                                                                                                                                                                |
|              `<mask>`:|The required parameter of the chosen timezone.                                                                                                                                                  |
|          `<timezone>`:|The optional parameter of the chosen timezone. It's possible to select from three different formats: Abbreviation, Location, and POSIX. If not specified, the GMT timezone is set by default.   |
|                       |You can see the complete listing of [all possible values](https://nodatime.org/TimeZones). POSIX format uses the opposite sign. Times to the west are positive, to the east negative.           |
|                       |For Central European Time, you can use `CET`, `Europe/Prague`, `Etc/GMT-2` (summer), `Etc/GMT-1` (winter). Abbreviated and location formats return values with the currently valid DST.         |
|        Returned value:|11.12.2022 18:06:13                                                                                                                                                                             |

##### Possible mask patterns to date and time formatting

|             Type|   Mask|Output                                           |
|----------------:|------:|:------------------------------------------------|
|             Year|   YYYY|2000, 2001, 2002 … 2012, 2013                    |
|                 |     YY|00, 01, 02 … 12, 13                              |
|            Month|   MMMM|January, February, March … November, December    |
|                 |    MMM|Jan, Feb, Mar … Nov, Dec                         |
|                 |     MM|01, 02, 03 … 11, 12                              |
|                 |      M|1, 2, 3 … 11, 12                                 |
|  Day of the year|   DDDD|001, 002, 003, … 364, 365, (366)                 |
| Day of the month|     DD|01, 02, 03, … 30, 31                             |
|                 |      D|1, 2, 3, … 30, 31                                |
|  Day of the week|   dddd|Monday, Tuesday, … Saturday, Sunday              |
|                 |    ddd|Mon, Tue, … Sat, Sun                             |
|             Hour|     HH|00, 01, 02, … 23, 24                             |
|                 |     hh|01, 02, 03, … 11, 12                             |
|                 |      h|1, 2, 3, … 11, 12                                |
|          AM / PM|      A|AM, PM                                           |
|                 |      a|am, pm                                           |
|           Minute|     mm|00, 01, 02, … 58, 59                             |
|                 |      m|0, 1, 2, … 58, 59                                |
|           Second|     ss|00, 01, 02, … 58, 59                             |
|                 |      s|0, 1, 2, … 58, 59                                |
|      Microsecond|      S|000000 … 999999                                  |
|         Timezone|    ZZZ|CST, UTC, CET                                    |
|                 |     zz|-06:00, Z, +01:00                                |
|                 |      Z|-0600, Z, +0100                                  |

#### generateED25519Key

|           Description:|Generates public and private [ED25519](https://en.wikipedia.org/wiki/EdDSA) key pairs (including SSH) and stores them for later use as internal variables with names using the base name and suffixes.         |
|----------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        Syntax example:|`<@generateED25519Key(<Key>)>`                                                                                                                                                                                 |
|            Parameters:|                                                                                                                                                                                                               |
|          `<basename>`:|The required parameter is the base name under which all generated key versions will be stored as internal variables in combination with a [set of suffixes](#available-set-of-suffixes-for-generateed25519key).|
|                       |Generated keys are formatted as multiline strings. That means using the `|` syntax is necessary in [import scripts](#using-of-generateed25519key-in-the-zerops-import-yaml-script).                            |
|                       |Example of the returned outputs, again as multiline strings and using the `|` syntax in [import scripts](#output-of-generateed25519key-in-the-zerops-import-yaml-script).                                      |

##### Available set of suffixes for generateED25519Key

|     Suffix|Description                                                            |  How to use with: `<@generateED25519Key(<Key>)>`|
|----------:|:----------------------------------------------------------------------|------------------------------------------------:|
|     Public|Public key version. This value is also returned by the called function.|                           `<@getVar(KeyPublic)>`|
|  PublicSsh|SSH formatted public key version. For use as the authorized key file.  |                        `<@getVar(KeyPublicSsh)>`|
|    Private|Private key version in the standard format. Not usable for OpenSSH.    |                          `<@getVar(KeyPrivate)>`|
| PrivateSsh|Private key version in the OpenSSH format.                             |                       `<@getVar(KeyPrivateSsh)>`|

##### Using of generateED25519Key in the Zerops import YAML script

```yaml
services:
- hostname: app
  type: nodejs@16
  minContainers: 1
  ports:
  - port: 3000
    httpSupport: true
  envVariables:
    # Generated as a multiline value
    # The same value as in APP_PUBLIC_KEY.
    GENERATED_PUBLIC_KEY: |
      <@generateED25519Key(<Key>)>
    # Generated as a multiline value.
    # The same value as in GENERATED_PUBLIC_KEY.
    APP_PUBLIC_KEY: |
      <@getVar(KeyPublic)>
    # Generated as a single value
    APP_PUBLIC_KEY_SSH: <@getVar(KeyPublicSsh)>
    # Generated as a multiline value
    APP_PRIVATE_KEY: |
      <@getVar(KeyPrivate)>
    # Generated as a multiline value
    APP_PRIVATE_KEY_SSH: |
      <@getVar(KeyPrivateSsh)>
```

##### Output of generateED25519Key in the Zerops import YAML script

```yaml
services:
- hostname: app
  type: nodejs@16
  minContainers: 1
  ports:
  - port: 3000
    httpSupport: true
  envVariables:
    # Generated as a multiline value
    # The same value as in APP_PUBLIC_KEY.
    GENERATED_PUBLIC_KEY: |
      -----BEGIN PUBLIC KEY-----
      MCowBQYDK2VwAyEAu0/gEIpNUbVdqA20lVl+ZD+5/zzfVK4exrgGLxgQQRU=
      -----END PUBLIC KEY-----
    # Generated as a multiline value.
    # The same value as in GENERATED_PUBLIC_KEY.
    APP_PUBLIC_KEY: |
      -----BEGIN PUBLIC KEY-----
      MCowBQYDK2VwAyEAu0/gEIpNUbVdqA20lVl+ZD+5/zzfVK4exrgGLxgQQRU=
      -----END PUBLIC KEY-----
    # Generated as a single value
    APP_PUBLIC_KEY_SSH: ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILtP4BCKTVG1XagNtJVZfmQ/uf8831SuHsa4Bi8YEEEV
    # Generated as a multiline value
    APP_PRIVATE_KEY: |
      -----BEGIN PRIVATE KEY-----
      MC4CAQAwBQYDK2VwBCIEIFzW6uPLlMnse2Hqg4hlyTwtlWaPKHjyoaaBi/FfVxBQ
      -----END PRIVATE KEY-----
    # Generated as a multiline value
    APP_PRIVATE_KEY_SSH: |
      -----BEGIN OPENSSH PRIVATE KEY-----
      b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtz
      c2gtZWQyNTUxOQAAACC7T+AQik1RtV2oDbSVWX5kP7n/PN9Urh7GuAYvGBBBFQAA
      AIiaywRCmssEQgAAAAtzc2gtZWQyNTUxOQAAACC7T+AQik1RtV2oDbSVWX5kP7n/
      PN9Urh7GuAYvGBBBFQAAAEBc1urjy5TJ7Hth6oOIZck8LZVmjyh48qGmgYvxX1cQ
      ULtP4BCKTVG1XagNtJVZfmQ/uf8831SuHsa4Bi8YEEEVAAAAAAECAwQF
      -----END OPENSSH PRIVATE KEY-----
```

#### generateRSA2048Key

|           Description:|Generates public and private [RSA 2048bit](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) key pairs (including SSH) and stores them for later use as internal variables with names using the base name and suffixes.|
|----------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        Syntax example:|`<@generateRSA2048Key(<Key>)>`                                                                                                                                                                                         |
|            Parameters:|                                                                                                                                                                                                                       |
|          `<basename>`:|The required parameter is the base name under which all generated key versions will be stored as internal variables in combination with a [set of suffixes](#available-set-of-suffixes-for-generatersa2048key).        |
|                       |Generated keys are formatted as multiline strings. That means using the `|` syntax is necessary in [import scripts](#using-of-generatersa2048key-in-the-zerops-import-yaml-script).                                    |
|                       |Example of the returned outputs, again as multiline strings and using the `|` syntax in [import scripts](#output-of-generatersa2048key-in-the-zerops-import-yaml-script).                                              |

##### Available set of suffixes for generateRSA2048Key

|     Suffix|Description                                                            |  How to use with: `<@generateRSA2048Key(<Key>)>`|
|----------:|:----------------------------------------------------------------------|------------------------------------------------:|
|     Public|Public key version. This value is also returned by the called function.|                           `<@getVar(KeyPublic)>`|
|  PublicSsh|SSH formatted public key version. For use as the authorized key file.  |                        `<@getVar(KeyPublicSsh)>`|
|    Private|Private key version in the standard format.                            |                          `<@getVar(KeyPrivate)>`|

##### Using of generateRSA2048Key in the Zerops import YAML script

```yaml
services:
- hostname: app
  type: nodejs@16
  minContainers: 1
  ports:
  - port: 3000
    httpSupport: true
  envVariables:
    # Generated as a multiline value
    # The same value as in APP_PUBLIC_KEY.
    GENERATED_PUBLIC_KEY: |
      <@generateRSA2048Key(<Key>)>
    # Generated as a multiline value.
    # The same value as in GENERATED_PUBLIC_KEY.
    APP_PUBLIC_KEY: |
      <@getVar(KeyPublic)>
    # Generated as a single value
    APP_PUBLIC_KEY_SSH: <@getVar(KeyPublicSsh)>
    # Generated as a multiline value
    APP_PRIVATE_KEY: |
      <@getVar(KeyPrivate)>
```

##### Output of generateRSA2048Key in the Zerops import YAML script

```yaml
services:
- hostname: app
  type: nodejs@16
  minContainers: 1
  ports:
  - port: 3000
    httpSupport: true
  envVariables:
    # Generated as a multiline value
    # The same value as in APP_PUBLIC_KEY.
    GENERATED_PUBLIC_KEY: |
      -----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyWMKx+vdEb/Ww19trV9D
      og7x6d4MCL4u576fVdDjBFhXjXYrK0Y0movvYNe72qtpggW8FnAiKbFNWMLr7mV1
      2u0JEdPzaqSOX/XKRKWq2q7wyZjGU0uVLJ3Rd2Y4yFyjg6zbvA0Hh5HRgbn7xoRM
      UbT3mt1lBP+DeHIi9exTvtiNfpO0Z1bidmLLvzLnakg1ei8YWnEAFJi83/MuRMhI
      WOA32h14WVbvg4SA7++STHF3uHL+kHJ7P/KeqACDBPbgcc9Sz7WsSTAO6Pdry3sr
      KCP60AMaT2PewB51AtuvFR8nP05WskMgd887KHXZjk9NhDU5E06vz4nf7a3t+it0
      UwIDAQAB
      -----END PUBLIC KEY-----
    # Generated as a multiline value.
    # The same value as in GENERATED_PUBLIC_KEY.
    APP_PUBLIC_KEY: |
      -----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyWMKx+vdEb/Ww19trV9D
      og7x6d4MCL4u576fVdDjBFhXjXYrK0Y0movvYNe72qtpggW8FnAiKbFNWMLr7mV1
      2u0JEdPzaqSOX/XKRKWq2q7wyZjGU0uVLJ3Rd2Y4yFyjg6zbvA0Hh5HRgbn7xoRM
      UbT3mt1lBP+DeHIi9exTvtiNfpO0Z1bidmLLvzLnakg1ei8YWnEAFJi83/MuRMhI
      WOA32h14WVbvg4SA7++STHF3uHL+kHJ7P/KeqACDBPbgcc9Sz7WsSTAO6Pdry3sr
      KCP60AMaT2PewB51AtuvFR8nP05WskMgd887KHXZjk9NhDU5E06vz4nf7a3t+it0
      UwIDAQAB
      -----END PUBLIC KEY-----
    # Generated as a single value
    APP_PUBLIC_KEY_SSH: ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDJYwrH690Rv9bDX22tX0OiDvHp3gwIvi7nvp9V0OMEWFeNdisrRjSai+9g17vaq2mCBbwWcCIpsU1YwuvuZXXa7QkR0/NqpI5f9cpEpararvDJmMZTS5UsndF3ZjjIXKODrNu8DQeHkdGBufvGhExRtPea3WUE/4N4ciL17FO+2I1+k7RnVuJ2Ysu/MudqSDV6LxhacQAUmLzf8y5EyEhY4DfaHXhZVu+DhIDv75JMcXe4cv6Qcns/8p6oAIME9uBxz1LPtaxJMA7o92vLeysoI/rQAxpPY97AHnUC268VHyc/TlayQyB3zzsoddmOT02ENTkTTq/Pid/tre36K3RT
    # Generated as a multiline value
    APP_PRIVATE_KEY: |
      -----BEGIN PRIVATE KEY-----
      MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDJYwrH690Rv9bD
      X22tX0OiDvHp3gwIvi7nvp9V0OMEWFeNdisrRjSai+9g17vaq2mCBbwWcCIpsU1Y
      wuvuZXXa7QkR0/NqpI5f9cpEpararvDJmMZTS5UsndF3ZjjIXKODrNu8DQeHkdGB
      ufvGhExRtPea3WUE/4N4ciL17FO+2I1+k7RnVuJ2Ysu/MudqSDV6LxhacQAUmLzf
      8y5EyEhY4DfaHXhZVu+DhIDv75JMcXe4cv6Qcns/8p6oAIME9uBxz1LPtaxJMA7o
      92vLeysoI/rQAxpPY97AHnUC268VHyc/TlayQyB3zzsoddmOT02ENTkTTq/Pid/t
      re36K3RTAgMBAAECggEBALr06GhK7hNxPgZoTCCchOQo7apISnG/ZTodPDxlzKsW
      /EjGgDMPXPxwlo0YGjxZz3w2qLNH7F86S2zwoCjUJkJUtYvIcXz6QXaSbvGlvuR/
      begpnUxsqZMe+/vVeTeA0QgH7II6slfIJnBBYZyc62EbGJa7m/G0569kflJB0Ekl
      iODxZkQlzHEPEhOV3I4aItD2Yzgx546ZJBUwgZMZwtbwDs9QNlyCUJROTGOixMCN
      o3Zicc61vHGd6apxPOpjdmuUoFuQuKqvC/tbl0niDawRwVrUspCNBlMhIKfc+7/3
      Hv2B2daRJmKogdImS5Tfrp/T3H/8p7+Y+CaP0Vz2afkCgYEA7GvSuLaCYAAn6Kjj
      MjDYB4n8tLKGzhPunHLOrsItt9lf+ZvJj7JuZ2pJVxV+psYPsXuCXXc5RJ6qbeVk
      9BcZcMOZIav7ZxnQCkNJryn++rszYu1Us1o8mWwdDqVwRxSSSMNeuQo95jcbRASX
      RbDfcUIU6/xXEx0osDEwVmkYZacCgYEA2hB8FvzouIs6e4h90K8T/DC6s2fvt4PA
      jhPLRVUFPO9DBbc/jJWwB8lkBpBNCytrIMQxOqhQ+Cgu5qyFmvTQgtNH/rSUyHE0
      oCuKJ2YfISwSgWfRB6CPPkrQYIIC2dzH//qYtXL1EfpBDSf77FOkd47ItVK+xpd4
      /7QKrAaA6XUCgYEAmUMovo+qIvvW40+gwSfC09hTFvzowO1Q8ODINagxpQ5o1lJ0
      rw/X3HidhLOtgAXDpKXRlC+201IcX9Omx0m2N1DFk3t/JY4pPI30VXZfEkGLBWWf
      VAl6YWchyx3alGm0jzD/1erax8QPi9+CBS6tGyngkD7sX7q2ZsnscQf+Rd8CgYEA
      tHO5zGgjyTtl/P45Z2zKdAJ7LaWQCOQdfzVAHDK8L+2rH9rB2vuv/PGaNZhKOTkH
      4MiaGHla79CI51jTAyUeO3TN+ifDi4+qxfTh0bK/hfrroWyg3NfwUdMlVwefhlwe
      oWTl5BmqVeMq29E/txSMYGenDe3Yc4y7k5aQ0kRbf1UCgYA529TVonnhzW1XkCGi
      eu9aVxA/oPAZDuaBMAdceAQMnLcI6JwkVOZw+wApuQaB+NyThkdXresQcUTi9CWL
      021UWc/cxfyuWBa9YWP4Q3LyiCHIux77wfxHH+oPgcFqbhUL3vDa7rJrjuKLWaiL
      T4S4GRajRsWdD8b/CvXd09oPag==
      -----END PRIVATE KEY-----
```

#### generateRSA4096Key

|           Description:|Generates public and private [RSA 4096bit](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) key pairs (including SSH) and stores them for later use as internal variables with names using the base name and suffixes.|
|----------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        Syntax example:|`<@generateRSA4096Key(<Key>)>`                                                                                                                                                                                         |
|            Parameters:|                                                                                                                                                                                                                       |
|          `<basename>`:|The required parameter is the base name under which all generated key versions will be stored as internal variables in combination with a [set of suffixes](#available-set-of-suffixes-for-generatersa4096key).        |
|                       |Generated keys are formatted as multiline strings. That means using the `|` syntax is necessary in [import scripts](#using-of-generateed25519key-in-the-zerops-import-yaml-script).                                    |
|                       |Example of the returned outputs, again as multiline strings and using the `|` syntax in [import scripts](#output-of-generatersa4096key-in-the-zerops-import-yaml-script).                                              |

##### Available set of suffixes for generateRSA4096Key

|     Suffix|Description                                                            |  How to use with: `<@generateRSA4096Key(<Key>)>`|
|----------:|:----------------------------------------------------------------------|------------------------------------------------:|
|     Public|Public key version. This value is also returned by the called function.|                           `<@getVar(KeyPublic)>`|
|  PublicSsh|SSH formatted public key version. For use as the authorized key file.  |                        `<@getVar(KeyPublicSsh)>`|
|    Private|Private key version in the standard format.                            |                          `<@getVar(KeyPrivate)>`|

##### Using of generateRSA4096Key in the Zerops import YAML script

```yaml
services:
- hostname: app
  type: nodejs@16
  minContainers: 1
  ports:
  - port: 3000
    httpSupport: true
  envVariables:
    # Generated as a multiline value
    # The same value as in APP_PUBLIC_KEY.
    GENERATED_PUBLIC_KEY: |
      <@generateRSA4096Key(<Key>)>
    # Generated as a multiline value.
    # The same value as in GENERATED_PUBLIC_KEY.
    APP_PUBLIC_KEY: |
      <@getVar(KeyPublic)>
    # Generated as a single value
    APP_PUBLIC_KEY_SSH: <@getVar(KeyPublicSsh)>
    # Generated as a multiline value
    APP_PRIVATE_KEY: |
      <@getVar(KeyPrivate)>
```

##### Output of generateRSA4096Key in the Zerops import YAML script

```yaml
services:
- hostname: app
  type: nodejs@16
  minContainers: 1
  ports:
  - port: 3000
    httpSupport: true
  envVariables:
    # Generated as a multiline value
    # The same value as in APP_PUBLIC_KEY.
    GENERATED_PUBLIC_KEY: |
      -----BEGIN PUBLIC KEY-----
      MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1kYEJ7bjBiXzBMI/cC6w
      ajclHdd5NZ0bsx2d8eVSaHUaz419fTPYBV7mPec0ybYulThvqWX7c7k5H/jJVvTc
      BRHv4NDqJmOlMHynz4+P4m9zD4gEoNqOCMartJr9yKyzrBplNuSd/IAFUCN6KIVu
      Pge1aftvkZy0AsdRbMHlqWvMEdH30MJdC7FkhFsrrX0sYvuaW2MFjkQTishEphha
      hgYTH5dCrrQajQBi7fSGEutW2CKp738x6hNbiB9//lYjczAK+esbfC6+WvmPODJn
      q9YdcJ4ejh5zhOstrMPvO+kTvDozE5x6ur9Rw5yh0MgjR8Q76aoocu4ZckbQqQvX
      7giQveJQdBn+ucYCQueSce4BkUm3S1ITdl2XUHgBj7XYnc+SqgvEtNn4YgyntAu/
      IaVBg/DGVOBqr6pcoh6KLgYSroJG2uxdDXkji1QvRjy3SjY7eQMgou9qUM/L12gZ
      PEyG+xflnkNzbS8PLIGY9F410bcf0ukkqEyDpCCgeoSrD1dJPme1WlSfhaVz7K9g
      m8HB9IsgiQugOoS0Fpw57bNujy3BXJO4ROlIxOAbAYV0IXMjE3uWGot8uFeTVqB4
      p5CzvTV9jdoQXKUFkkgm69MEoN98QB0Ts3BtcOf59X6uOu9twm1ltxnLH52i/4Ty
      LdzErIs9vEaox5Qe6l4lhAUCAwEAAQ==
      -----END PUBLIC KEY-----
    # Generated as a multiline value.
    # The same value as in GENERATED_PUBLIC_KEY.
    APP_PUBLIC_KEY: |
      -----BEGIN PUBLIC KEY-----
      MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1kYEJ7bjBiXzBMI/cC6w
      ajclHdd5NZ0bsx2d8eVSaHUaz419fTPYBV7mPec0ybYulThvqWX7c7k5H/jJVvTc
      BRHv4NDqJmOlMHynz4+P4m9zD4gEoNqOCMartJr9yKyzrBplNuSd/IAFUCN6KIVu
      Pge1aftvkZy0AsdRbMHlqWvMEdH30MJdC7FkhFsrrX0sYvuaW2MFjkQTishEphha
      hgYTH5dCrrQajQBi7fSGEutW2CKp738x6hNbiB9//lYjczAK+esbfC6+WvmPODJn
      q9YdcJ4ejh5zhOstrMPvO+kTvDozE5x6ur9Rw5yh0MgjR8Q76aoocu4ZckbQqQvX
      7giQveJQdBn+ucYCQueSce4BkUm3S1ITdl2XUHgBj7XYnc+SqgvEtNn4YgyntAu/
      IaVBg/DGVOBqr6pcoh6KLgYSroJG2uxdDXkji1QvRjy3SjY7eQMgou9qUM/L12gZ
      PEyG+xflnkNzbS8PLIGY9F410bcf0ukkqEyDpCCgeoSrD1dJPme1WlSfhaVz7K9g
      m8HB9IsgiQugOoS0Fpw57bNujy3BXJO4ROlIxOAbAYV0IXMjE3uWGot8uFeTVqB4
      p5CzvTV9jdoQXKUFkkgm69MEoN98QB0Ts3BtcOf59X6uOu9twm1ltxnLH52i/4Ty
      LdzErIs9vEaox5Qe6l4lhAUCAwEAAQ==
      -----END PUBLIC KEY-----
    # Generated as a single value
    APP_PUBLIC_KEY_SSH: ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDWRgQntuMGJfMEwj9wLrBqNyUd13k1nRuzHZ3x5VJodRrPjX19M9gFXuY95zTJti6VOG+pZftzuTkf+MlW9NwFEe/g0OomY6UwfKfPj4/ib3MPiASg2o4Ixqu0mv3IrLOsGmU25J38gAVQI3oohW4+B7Vp+2+RnLQCx1FsweWpa8wR0ffQwl0LsWSEWyutfSxi+5pbYwWORBOKyESmGFqGBhMfl0KutBqNAGLt9IYS61bYIqnvfzHqE1uIH3/+ViNzMAr56xt8Lr5a+Y84Mmer1h1wnh6OHnOE6y2sw+876RO8OjMTnHq6v1HDnKHQyCNHxDvpqihy7hlyRtCpC9fuCJC94lB0Gf65xgJC55Jx7gGRSbdLUhN2XZdQeAGPtdidz5KqC8S02fhiDKe0C78hpUGD8MZU4GqvqlyiHoouBhKugkba7F0NeSOLVC9GPLdKNjt5AyCi72pQz8vXaBk8TIb7F+WeQ3NtLw8sgZj0XjXRtx/S6SSoTIOkIKB6hKsPV0k+Z7VaVJ+FpXPsr2CbwcH0iyCJC6A6hLQWnDnts26PLcFck7hE6UjE4BsBhXQhcyMTe5Yai3y4V5NWoHinkLO9NX2N2hBcpQWSSCbr0wSg33xAHROzcG1w5/n1fq46723CbWW3GcsfnaL/hPIt3MSsiz28RqjHlB7qXiWEBQ==
    # Generated as a multiline value
    APP_PRIVATE_KEY: |
      -----BEGIN PRIVATE KEY-----
      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
      A0bX/JM8kHjLlJNrtioxcT+dX4lL6/zT
      -----END PRIVATE KEY-----
```
