# Fetch

The interface through which JavaScript can make HTTP requests is called
`fetch`. Calling `fetch` returns a promise that resolves to a `Response`
object holding information about the server's response, such as its
status code and its headers.

```ts
const response = await fetch("https://examplecat.com");
console.log(response); // => Response { status: 200, headers: { ... }, ... }
```

> [!NOTE]
> The promise returned by `fetch` resolves successfully even if the
> server responded with an error code. It is rejected if there is a
> network error or if the server to which the request is addressed can't
> be found.

The first argument to fetch is the URL that should be requested. When
that URL doesn't start with a protocol name (such as `https:`), it is
treated as relative, which means it is interpreted relative to the
current document. When it starts with a slash (`/`), it replaces the
current path, which is the part after the server name. When it does not,
the part of the current path up to and including its last slash
character is put in front of the relative URL.

To get at the actual content of a `Response` object, you can use its
`text` method. Because the initial promise is resolved as soon as the
response's headers have been received, and because reading the response
body might take a while longer, this again returns a promise.

```ts
const responseBody = await response.text();
console.log(responseBody); // => "<!doctype html>\n<html>\n<head>\n..."
```

By default, `fetch` uses the `GET` method to make its request and does
not include a request body. You can configure it differently by passing
an object with extra options as a second argument. For example, this
request tries to use the `POST` method to make its request:

```ts
fetch("https://examplecat.com", { method: "POST" });
```

To add a request body, you can include a `body` option. To set headers,
use the `headers` property.

```ts
fetch("https://examplecat.com", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: "Miaw",
});
```

The browser will automatically add some request headers, such as "Host"
and those needed for the server to figure out the size of the body. But
adding your own headers is often useful to include things such as
authentication information or to tell the server which file format you'd
like to receive.
