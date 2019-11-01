# vzhuh

Instant deployment of static websites to Yandex Cloud

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/vzhuh.svg)](https://npmjs.org/package/vzhuh)
[![Downloads/week](https://img.shields.io/npm/dw/vzhuh.svg)](https://npmjs.org/package/vzhuh)
[![License](https://img.shields.io/npm/l/vzhuh.svg)](https://github.com/pyzhianov/vzhuh/blob/master/package.json)

<!-- toc -->
* [vzhuh](#vzhuh)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g vzhuh
$ vzhuh COMMAND
running command...
$ vzhuh (-v|--version|version)
vzhuh/0.1.0 darwin-x64 node-v10.16.0
$ vzhuh --help [COMMAND]
USAGE
  $ vzhuh COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`vzhuh deploy`](#vzhuh-deploy)
* [`vzhuh help [COMMAND]`](#vzhuh-help-command)
* [`vzhuh kill WEBSITE`](#vzhuh-kill-website)

## `vzhuh deploy`

deploy a new website

```
USAGE
  $ vzhuh deploy

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/deploy.ts](https://github.com/pyzhianov/vzhuh/blob/v0.1.0/src/commands/deploy.ts)_

## `vzhuh help [COMMAND]`

display help for vzhuh

```
USAGE
  $ vzhuh help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `vzhuh kill WEBSITE`

permanently delete one or more websites

```
USAGE
  $ vzhuh kill WEBSITE

ARGUMENTS
  WEBSITE  One or more website names

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ vzhuh kill website1 website2
```

_See code: [src/commands/kill.ts](https://github.com/pyzhianov/vzhuh/blob/v0.1.0/src/commands/kill.ts)_
<!-- commandsstop -->
