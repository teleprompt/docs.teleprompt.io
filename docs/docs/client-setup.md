---
id: client-setup
title: Setup in your service
---

You may either use our [command line tool](#setup-cli-tool) (recommended) or just [`curl`](#setup-curl) to dispatch HTTPS requests manually.

The command line tool comes as an npm package. Be aware that when sending requests manually without our client, you cannot easily use end-to-end encryption.

<h2 id="setup-cli-tool">Command line client setup</h2>

[👉 CLI tool usage](./client-client-usage)

First, install the `teleprompt` package and make sure node.js is installed.

```
$ npm install --save-dev teleprompt
```

Now that the package is installed, let's check out the client's usage instructions.

```
$ npx teleprompt --help
```

`npx` is a tool that comes with `npm` and allows to conveniently execute locally installed packages.

You are now ready to [use the client](./cli-client-usage)!

<h2 id="setup-curl">cURL setup</h2>

[👉 REST API usage](./rest-api)

cURL is a common tool found on many Linux / BSD / macOS systems for dispatching HTTP requests.

You can use it to utilize the teleprompt.io REST API manually without the need for any dedicated teleprompt client, at the expense of not being able to have end-to-end encryption easily.

All we need to do is to make sure that the `curl` command is available. Try running:

```
$ curl --version
```

It should show its version number among other things. If you see a `command not found` error instead, you still need to install cURL. The necessary steps vary between operating systems.

For Debian or Ubuntu Linux, for example, you would install cURL by running

```
$ sudo apt-get install curl
```

You are now ready to [use the REST API](./rest-api)!
