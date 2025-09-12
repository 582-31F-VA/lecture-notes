# Continuation-passing style

One approach to asynchronous programming is to make functions that need
to wait for something take an extra argument: a **continuation**. A
continuation is a function that represents the _remainder_ of the
program from a certain point onward. The idea is that the asynchronous
function starts a process, then arranges for the continuation to be
called with the result once the process finishes.

As an example, the native `setTimeout` function uses this
continuation-passing style. It takes two arguments: a continuation and a
delay in milliseconds after which the continuation is called.

```ts
setTimeout(() => console.log("Tick"), 500);
setTimeout(() => console.log("Tack"), 200);
```

In the code above, both delays are counted down _at the same time_.
After 200 milliseconds, the continuation `() => console.log("Tack")` is
called. Then, 300 milliseconds later, the continuation
`() => console.log("Tick")` is called. If this program were synchronous,
it would take 700 milliseconds to complete. But because it is
asynchronous, the total time is only 500 milliseconds.

Let's look at an example where the asynchronous operation produces a
result: reading a file from a device's storage.

```ts
function read(filepath, continuation) {
    setTimeout(
        () => continuation(`Content from ${filepath}`),
        Math.floor(Math.random() * 1001),
    );
}
```

The asynchronous function `read` simulates reading a file. It takes a
file path and a continuation as arguments. After a random delay, it
calls the continuation with fake content.

Here is how to use `read` to read a (fake) file and print its content
with `console.log`:

```ts
read("foo.txt", (content) => console.log(content));
```

Using the continuation-passing style to perform multiple asynchronous
actions in a row means that we have to keep passing new functions to
handle the continuation of the computation. For instance, an
asynchronous function that compares two files and produces a boolean
indicating whether their content is the same might look like this:

```ts
function compareFiles(filepathA, filepathB, continuation) {
    read(filepathA, (contentA) => {
        read(filepathB, (contentB) => {
            continuation(contentA === contentB);
        });
    });
}

compareFiles("foo.txt", "bar.txt", (areSame) => {
    if (areSame) console.log("Same content");
    else console.log("Different content");
});
```

Notice how none of these functions _return_ anything. Instead, the
result of the asynchronous operation is passed as an argument to the
continuation. In a way, asynchronicity is contagious. Any function that
depends on the result of an asynchronous function must itself be
asynchronous, using a continuation to deliver its result.
