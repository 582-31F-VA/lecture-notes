# Promises

An alternative to continuations is to have asynchronous functions return
an object that represents its (future) result. This way, our
asynchronous functions actually return something meaningful, and the
shape of the program more closely resembles that of synchronous
programs. In JavaScript, this is what `Promise` objects are for. A
promise is a _receipt_ representing a value that may not be available
yet.

Unfortunately, creating a promise is somewhat convoluted. The `Promise`
constructor expects a function as its argument, which it immediately
calls, passing it a function that it can use to resolve the promise.

Here is a version of the previous `read` function that returns a promise
instead of taking a continuation as an argument:

```ts
function read(path: string): Promise<string> {
    return new Promise((resolve) =>
        setTimeout(
            () => resolve(`Content from ${path}`),
            Math.floor(Math.random() * 1001),
        )
    );
}
```

Note how, in contrast to the continuation-passing style, this
asynchronous function returns a meaningful value — a promise to give you
the contents of the file at some point in the future.

Luckily, you will rarely need to create promises explicitely. Most of
the time, your job will be to handle them. To do so, promises provide a
`then` method that allows you to register a function that should be
called when the action for which it is waiting finishes. When the
promise is **resolved** (meaning its value becomes available), the
function is called with the result value.

```ts
read("foo.txt").then((content) => console.log(content));
```

But even with promises, asynchronous code can be annoying to write.
Promises often need to be tied together in verbose, arbitrary-looking
ways. For instance, here is a version of `compareFiles` that uses
promises:

```ts
function compareFiles(pathA: string, pathB: string): Promise<boolean> {
    return read(pathA).then((contentA) =>
        read(pathB).then((contentB) => contentA === contentB)
    );
}
```

The good news is that JavaScript allows you to write pseudosynchronous
code to describe asynchronous computation. To do this, we use `async`
functions. An `async` function _implicitly_ returns a promise and can,
in its body, `await` other promises in a way that _looks_ synchronous.

Using `async` and `await` instead of `then`, we can rewrite
`compareFiles` like this:

```ts
async function compareFiles(
    pathA: string,
    pathB: string,
): Promise<boolean> {
    const contentA = await read(pathA);
    const contentB = await read(pathB);
    return contentA === contentB;
}
```

An `async` function is marked by the word `async` before the `function`
keyword. When such a function is called, it _always_ returns a promise.
As soon as the function returns something, that promise is resolved.

Inside an `async` function, the word `await` can be put in front of an
expression to wait for a promise to resolve and only then continue the
execution of the function.

Such a function no longer runs from start to completion in one go like a
regular JavaScript function. Instead, it can be frozen at any point that
has an `await` and can be resumed at a later time.

For most asynchronous code, this notation is more convenient than
directly using promises. You do still need an understanding of promises,
since in many cases you'll still interact with them directly. But when
wiring them together, `async` functions are generally more pleasant to
write than chains of `then` calls.
