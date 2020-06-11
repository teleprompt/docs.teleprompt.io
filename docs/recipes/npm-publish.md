---
title: npm publish with 2FA
description: Publishing an npm package with enabled two-factor auth in GitHub Actions or Travis CI
keywords: ["npm", "publish", "2fa", "otp", "teleprompt", "continuous integration", "git", "travis ci", "github actions"]
---

Let's put teleprompt to good use and publish an npm package every time we create a new git tag 🚀

What's so special about that? It will work with the secure on-publish two-factor authentication (2FA) setting enabled on our npm account. We shall use teleprompt.io to ask you for the 2FA token whenever we are about to publish.

The additional benefit is that you can rest assured that the CI can never publish without your consent as it lacks half of the credentials. You will receive a notification and authorize every `npm publish` in a few seconds.

<!-- Ideally a screencast of the resulting workflow -->

## Getting the keys

Our goal is to publish when a new git tag is pushed or a new release is created in GitHub. Let's start by logging in to [npmjs.com](https://npmjs.com) and [teleprompt.io](https://teleprompt.io/dashboard) to collect our credentials.

First, let's log in to npmjs.com and check out the `Auth Tokens` settings page. Create a new token with publishing rights and keep the actual token at hand. You might also want to check our two-factor auth settings while you are here.

Secondly, log in to the [Teleprompt Dashboard](https://teleprompt.io/dashboard). Choose `Projects` from the main menu on the left and create a new project for your repository. After choosing an arbitrary name and submitting the project creation form, an API key will be created for you automatically. Keep this API key at hand, too.

## GitHub Actions

Read here how to set up automatic publishing in GitHub Actions now. You can find instructions for other CI environments below.

Head over to your GitHub repository's settings and [create the following secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository):

* `NPM_TOKEN` – Your npm authentication token
* `TELEPROMPT_KEY` – Your teleprompt API key

Let's [create a new workflow now](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow#creating-a-workflow-file). We will call the workflow file `build.yml` and start with an empty workflow file.

Paste the following workflow configuration into our new workflow.

```yaml
# This is a basic workflow to help you get started with Actions

name: npm package CI

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:
  push:
    tag: [ master ]
  release:
    types: [created]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
    - uses: actions/setup-node@v1.4.2
      with:
        node-version: 12.x

    # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
    - name: Checkout
      uses: actions/checkout@v2.2.0

    # Install
    - run: npm ci

    # Test
    - run: npm test

    # Publish
    - name: npm publish
      run: |
        echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc
        npm version from-git --allow-same-version
        npm publish $(npx teleprompt --output-format cli --prompt "otp:otp:2FA Token")
      env:
        NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        TELEPROMPT_KEY: ${{ secrets.TELEPROMPT_KEY }}
```

The last few lines is where the magic happens: We use `npx` to download and run the `teleprompt` client and use it to feed the `otp` option to `npm publish`. You can find the details how to use the teleprompt command line client [here](../docs/cli-client-usage).

That's it! Try to create a tag / release in GitHub – once the last job in the workflow is run, you should receive an email from teleprompt.io, asking you to provide the required information.

## Travis CI

We assume you have already added your repository to Travis CI. Let's open it and head over to the Travis CI settings for this repository. Under "Environment Variables" make sure to add your secrets:

* `NPM_TOKEN` – Your npm authentication token
* `TELEPROMPT_KEY` – Your teleprompt API key

Do not restrict these secret environment variables to certain branches as we will build per git tag and Travis CI won't associate the tag with the branch you tagged.

Create a `.travis.yml` file with the following content.

```yaml
language: node_js
cache: npm
node_js:
  - "12"

stages:
  - name: test
  - name: publish
    if: tag =~ /^v?[0-9]+\.[0-9]+\.[0-9]/

jobs:
  include:
    - stage: test
      script: npm test
    - stage: publish
      before_script:
        - echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc
      script:
        - npm version $(echo $TRAVIS_TAG | sed s/^v//) --allow-same-version
        - npm publish $(npx teleprompt --output-format cli --prompt "otp:otp:2FA Token")
```

That's it! Try to create a tag and wait for the build to reach the `npm publish` step. You should receive an email from teleprompt.io, asking you to provide the required information.

## Other CI providers

There are of course more CI providers, like GitLab CI, Circle CI, Jenkins CI, Atlassian Bamboo, AppVeyor and others.

We will not go into details for all those CI providers, but the setup is generally very similar in all of them. Check out the examples above and your CI tool's documentation to create your own setup.

<!-- Tag-based version (?) -->

## Why is on-publish 2FA so important?

Without teleprompt.io there is hardly a simple way to achieve the setup outlined above. It is trivial to create a similar setup if the npm 2FA setting is set to auth-only, but that this option provides insufficient security for publishing in CI.

There are multiple ways how a malicious actor could obtain your npm authentication token from your CI environment. For instance, the npm token environment variable might be set when running the tests for an externally-contributed pull request due to some simple misconfiguration. Alternatively, your CI provider might suffer from an information expose vulnerability that reveals environment variables or files.

In case of two-factor authentication being disabled or auth-only only, an attacker who got hold of your npm authentication token is immediately able to publish new versions containing arbitrary code.

Not so with on-publish 2FA: In order to publish to npm you still need the current 2FA token. Even if the attacker also obtained the teleprompt API key from your CI environment, they **can only use it to ask you for the 2FA token**.

That's what makes this setup so secure: Even in the worst case scenario you are still in charge of the credentials.
