# Asynchronous programming

Consider the following code:

```ts
const name = "Miriam";
const greeting = `Hello, my name is ${name}!`;
console.log(greeting); // => "Hello, my name is Miriam!"
```

When the browser executes this program, it steps through the code one
line at a time, in the order we wrote it. Because each line depends on
the work done in the preceding line, the browser needs to _wait_ for a
line to finish its work before going on to the next. This kind of
program where things happen one at a time is called **synchronous**.

Note that the program would still be synchronous even if we called a
separate function, like this:

```ts
const name = "Miriam";
const greeting = makeGreeting(name);
console.log(greeting); // => "Hello, my name is Miriam!"

function makeGreeting(name: string): string {
    return `Hello, my name is ${name}!`;
}
```

Here, `makeGreeting` is a synchronous function because the caller has to
wait for the function to finish its work and return a value before the
caller can continue.

The part of the computer that carries out the individual steps that make
up our programs is called the **processor**. The programs we have seen
so far will keep the processor busy until they have finished their work.
The speed at which something like a loop that manipulates numbers can be
executed depends pretty much entirely on the speed of the computer's
processor and memory.

But many programs interact with things outside of the processor. For
example, they may communicate over a computer network or request data
from the hard disk, which is a lot slower than getting it from memory.
When such a thing is happening, it would be a shame to let the processor
sit idle — there might be some other work it could do in the meantime.
In part, this is handled by your operating system, which will switch the
processor between multiple running programs. But that doesn't help when
we want a single program to be able to make progress while it is waiting
for a task to complete.

An **asynchronous** program allows multiple things to happen at the same
time. When you start an action, your program continues to run. When the
action finishes, the program is informed and gets access to the result
(for example, the data read from disk).

We can compare synchronous and asynchronous programming using a small
example: a program that makes two requests over the network and then
combines the results.

In a synchronous environment, where the request function returns only
after it has done its work, the easiest way to perform this task is to
make the requests one after the other. This has the drawback that the
second request will be started only when the first has finished. The
total time taken will be at least the sum of the two response times.

In the asynchronous model, starting a network action allows the program
to continue running while the network communication happens alongside
it, notifying the program when it is finished.
