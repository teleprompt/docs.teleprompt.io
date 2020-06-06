---
id: cli-client-usage
title: Command line client
---

## Basics

Make sure that you [installed the client](./client-setup) and [created a new project](./create-project) on teleprompt.io.

Eventually a new API key should be created and displayed to you while creating the project. Make sure to have that key ready. If you do not have an API key, you can always login, open your project and create a new one.

Open your terminal, let's prompt for a password:

```
$ npx teleprompt --api-key <YOUR-KEY> --prompt 'mypassword:password:Enter your password'
Waiting for https://teleprompt.io/dashboard/prompt/<SOME-UUID> …
```

The format of the `--prompt` option is `<name>:<type>[:<title>]`. The `name` is to identify the field, the `type` determines what kind of input to show on the web dashboard and the optional `title` is a label shown on the input field. For details, check [prompt option](#prompt-option) below.

You should now have received an email notification that there is a pending prompt for your project. Open the link to get to the dashboard and see the password prompt.

Once you enter the password and submit, you should now see that the `teleprompt` client wrote this output to your console and exited:

```
[ { name: 'mypassword', value: '<PASSWORD-YOU-ENTERED>' } ]
```

Notice that the "Waiting for …" line that was printed first was written to stderr, whereas only the actual result data was written to stdout. This way you can use the result data as is without the "Waiting for …" message being in the way.

Don't want to pass the `--api-key` option on every single invocation? Create a [.teleprompt.key](#configuration-files) file.

Congrats! This is all it takes to request sensitive data interactively from any command line 🎉

## Output format

### Raw data

By default the result data is output as JSON. While JSON is a very common and versatile data representation it is not necessarily the most convenient to use on a command line.

Let's try the last invocation again, but this time with the `--only` option (check `npx teleprompt --help` for details).

```
$ npx teleprompt --api-key <YOUR-KEY> --prompt 'mypassword:password:Enter your password' --only mypassword
```

Reply to the prompt as you did before. Check your terminal. You should now see that only the raw password has been output.

### Command line args

You will oftentimes find yourself in a situation where you want to pass the result fields to another command line tool as arguments. For that purpose you can have the result output formatted as command line options.

Try this on a Linux or macOS terminal (`bash` or `zsh`):

```
$ npx teleprompt --api-key <YOUR-KEY> --prompt 'password:password:Enter your password' --prompt 'title:text' --output-format cli
```

After answering the prompt you should now see this output on your console:

```
--password=<YOUR-PASSWORD> --title=<YOUR-TITLE>
```

The `--prompt` options' `name` part (the value before the first colon) determines the name of the output option. This output can be consumed very easily in other commands. Consider this, for instance:

```
./build-and-sign-stuff $(npx teleprompt --api-key <YOUR-KEY> --prompt 'password:password:Enter your password' --prompt 'title:text' --output-format cli)
```

## Prompt option

The `--prompt` option expects a value of the following format:

```
--prompt <name>:<type>[:<title>]
```

#### `<name>`

Name of the field, so you can tell your result fields apart if you have multiple `--prompt` options.

#### `<type>`

Determines the kind of input field to show in the web dashboard. Must be one of these values:

* `password` – Shows a password input field
* `text` - Shows a plain text input field
* `otp` - Shows an input field for a two-factor auth PIN
* `file` - Shows a file picker and sends the file content
* `select` - Shows a dropdown (options can only be specified in a `teleprompt.toml` config file)

#### `<title>`

Optional. Will be shown as a label above the input field.


## Configuration files

#### teleprompt.key

Passing the API key via the `--api-key` option on every invocation can be tedious. Instead, you can create a file named `.teleprompt.key` or `teleprompt.key` and copy your API key into it as is.

You are free to add comments in that config file, too: The file may contain multiple lines. Each line starting with a `#` character will be ignored.

#### teleprompt.toml

You can configure all the options using a file named `.teleprompt.toml` or `teleprompt.toml`, too. In fact, right now the options for prompts of type `select` can only be defined using a config file.

Here is a sample file:

```toml
# teleprompt.toml
# the following project settings are all optional
title = "Authorize my thing"
link = "https://ci.example.org/build/${BUILDREF}"
disableEncryption = false

[[prompts]]
name = "username"
type = "text"

[[prompts]]
name = "password"
type = "password"

[[prompts]]
name = "target"
type = "select"

[[prompts.choices]]
title = "Production"    # optional
value = "production"

[[prompts.choices]]
title = "Staging"       # optional
value = "staging"
```

After creating the key file and the config file you can prompt for data in a much shorter form:

```
$ npx teleprompt --prompt username --prompt password
```

Alternatively, specify multiple prompts at once: `--prompt username,password`.
