# Custom elements

JavaScript allows us to create custom elements: that is, new HTML
elements whose behavior we define ourselves, such as a `<word-count>`
element that displays the word count of an input, or an
`<editable-list>` element that enables editing of the list it wraps.

A custom element is implemented as a class which extends `HTMLElement`.
For instance, here's how to declare a class for the `<word-count>`
element:

```ts
class WordCount extends HTMLElement {
    counter = document.createElement("p");
    input: HTMLInputElement | null = null;

    constructor() {
        super();
    }
}
```

The constructor of a custom element should not have parameters. It must
call `super` to instantiate the parent class, and may only be used to
set up initial state and default values. When the browser instantiates
our element, it's not part of the DOM yet.

To register the custom element with the browser, we use the `define`
method of the global `customElements` object. Its first parameter is the
tag name of the custom element (`word-count`, `editable-list`, etc.),
and its second parameter is the class. The tag name must include a
hyphen.

```ts
customElements.define("word-count", WordCount);
```

Once your custom element is registered, the browser will call certain
methods of your class when it interacts the custom element in certain
ways. By providing an implementation of these methods (referred to as
**lifecycle callbacks**), you can run code in response to these events.

The most important lifecycle callback is `connectedCallback`, which the
browser calls when the element is added to the DOM. In a sense, this is
the custom element's main function.

```ts
class WordCount extends HTMLElement {
    // ...

    connectedCallback() {
        this.input = this.querySelector("input");
        if (!this.input) return;

        this.render(this.count);
        this.prepend(this.counter);

        this.input.addEventListener(
            "input",
            () => this.render(this.count),
        );
    }

    get count(): number {
        if (!this.input) return 0;
        return this.input.value
            .trim()
            .split(" ")
            .filter(word => word.length > 0)
            .length;
    }

    render(count: number): void {
        this.counter.textContent = `Words: ${count}`;
    }
}
```

Note that `WordCount` _is an_ `HTMLElement`. It inherits the same
properties as built-in elements, such as `prepend`, `querySelector`,
`addEventListener`, etc.

Another useful lifecycle callback is `attributeChangedCallback`. Like
built-in elements, custom elements can use HTML attributes to configure
the element's behavior. To use attributes, an element has to be able to
respond to changes in an attribute's value. To do this, a custom element
needs to add the following members to the class that implements the
custom element:

- A static property named `observedAttributes`. This must be an array
  containing the names of all attributes for which the element needs
  change notifications.
- An implementation of the `attributeChangedCallback` lifecycle
  callback.

The `attributeChangedCallback` callback is then called whenever an
attribute whose name is listed in the element's `observedAttributes`
property is added, modified, removed, or replaced. The callback is
passed three arguments: the name of the attribute which changed, the
attribute's old value, and the attribute's new value.

Here's how to allow users of our `<word-count>` custom element to add a
maximum to the counter:

```ts
class WordCount extends HTMLElement {
    // ...

    max: number | null = null;
    static observedAttributes = ["max"];

    attributeChangedCallback(
        name: string,
        _oldValue: string,
        newValue: string,
    ) {
        if (name === "max") {
            this.max = Number(newValue);
            this.render(this.count);
        }
    }
}
```

## Progressive enhancement

Since custom elements rely on JavaScript, they should be designed to
progressively enhance the HTML document in which they are used. The main
functionalities of your web page should not depend on them. Furthermore,
because custom elements are not semantic (their meaning is equivalent to
that of a `<div>`), it should always _wrap_ other tags that are.

Here's how to use our `<word-count>` element properly:

```html
<label>
    Example
    <word-count><input></word-count>
</label>
```

Note how `<word-cound>` does not include the `<input>`, but merely wraps
it. If, for any reason, JavaScript is unavailable, the web page will not
break. Users will still be able to enter their text into the field.
