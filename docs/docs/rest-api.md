---
id: rest-api
title: REST API
---

## List personal data & projects via cURL

```
$ curl \
  -H 'Authorization: Bearer <API-KEY>' \
  https://api.teleprompt.io/me
```

## Prompt for data via cURL

```
$ curl \
  -X POST \
  -H 'Authorization: Bearer <API-KEY>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Title for the whole prompt", "url":"https://example.org/", "prompts":[{"name":"mypassword","title":"Enter the password","type":"password"}]}' \
  https://api.teleprompt.io/project/<PROJECT-ID>/prompt
```

The `curl` command will keep running until you reply to the prompt. Add a query parameter named `async` to make the request finish immediately with a link to a URL to request to retrieve the result data.

**Attention:** Be aware that the command above will not end-to-end encrypt any data as we did not specify any encryption details.

Instructions on how to use end-to-end encryption with `cURL` coming soon.

## REST API

API reference coming soon.
