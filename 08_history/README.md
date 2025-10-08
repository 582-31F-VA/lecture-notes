# History

When using JavaScript to add interactivity to a web page, it's important
to preserve standard behaviors that users expect from their browser.
When a user submits a form to perform a search, for example, the browser
includes the search parameters in the URL. This allows results to
persist across reloads or be shared via link. If we take over the search
handling with JavaScript instead, it's our responsibility to reproduce
this behavior and meet user expectations. To do so, we use the History
API, which provides access to the browser's session history.

The `pushState` method, specifically, allows us to add an entry to the
browser's session history stack. It takes three arguments:

- a `state` object (often `null`) which is associated with the new
  history entry,
- an empty string, and most importantly
- the new history entry's URL.

Here is how we can use `pushState` to add a search parameter to the
current URL:

```ts
const current_href = location.href;
const url = new URL(current_href);
url.searchParams.append("search", "foo");
history.pushState(null, "", url);
```
