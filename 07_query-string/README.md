# Query string

A **query string** is the part of a URL that assigns values to specified
**query parameters**. Query parameters are `key=value` pairs used to
send data to the server. They are typically used in GET requests to
encode the content of HTML forms.

A typical URL containing a query string is as follows:

```
https://example.com/over/there?name=ferret&color=purple
```

The query string starts after the `?`. It contains two parameters
separated by an `&`: `name=ferret` and `color=purple`.

## URL

In JavaScript, `URL` objects are used to parse, construct, normalize and
encode URLs. They provide properties which allow us to easily read and
modify the components of a URL, including the query string.

We create a new `URL` object by specifying the URL as a string when
calling its constructor, or by providing a relative URL and a base URL.

```ts
const base = new URL("https://developer.mozilla.org");
const url = new URL("/en-US/docs", base);
console.log(url.href); // => https://developer.mozilla.org/en-US/docs
```

Once we have a `URL` object, we can set it's properties to modify the
URL.

```ts
url.pathname = "/cats";
console.log(url.href); // https://developer.mozilla.org/cats
```

You can find a [description][URL] of those properties on MDN.

[URL]: https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties

### URLSearchParams

The `searchParams` property of a `URL` is a `URLSearchParams` object
that can be used to manipulate the URL's query string. It provides all
the necessary methods to `get` `set`, `append` and `delete` query
parameters. You can find [examples][URLSearchParams] of how to use these
methods on MDN.

[URLSearchParams]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#using_urlsearchparams
