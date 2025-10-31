# Shadow DOM

An important aspect of custom elements is _encapsulation_. Since custom
elements can be used by any web page, it's important that code running
in the page does not accidentally break a custom element by modifying
its internal implementation. Shadow DOM enables you to attach a DOM tree
to an element, and have the internals of this tree hidden from
JavaScript and CSS running in the page.

Some built-in elements already make use of shadow DOM to encapsulate
their inner structure. Think for example of a `<video>` element, with
the default browser controls exposed. All you see in the DOM is the
`<video>` element, but it contains a series of buttons and other
controls hidden from JavaScript and CSS because they are inside its
shadow DOM.

A shadow DOM tree starts with a **shadow root**, underneath which you
can attach any element. The shadow root it attached to a **shadow
host**, which is an element of the regular DOM tree. You can affect the
nodes in the shadow DOM in exactly the same way as non-shadow nodes. The
difference is that none of the code inside a shadow DOM can affect
anything outside it, and vice versa.

![shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM/shadowdom.svg)

To create a shadow DOM and attach it to an element, we use the
`attachShadow` method, which returns a `ShadowRoot` object. We can then
attach nodes to the shadow DOM just like we would to the regular DOM,
using methods such as `append`, `replaceChildren`, and so on.

You will find included in this directory a `PasswordToggle.ts` file that
implements a toggle for showing and hiding the value of a password
input. You can use it like so:

```html
<label>
    Password:
    <input id="password" type="password">
    <password-toggle for="password">
</label>
```

If you add it to your document, notice how the `<button>` used for the
toggle is inaccessible to methods such as `querySelector` and cannot be
styled with CSS.
