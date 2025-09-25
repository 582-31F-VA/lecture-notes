# Serialization

Because properties grasp their value rather than contain it, objects and
arrays are stored in the computer's memory as sequences of bits holding
the addresses (i.e., the place in memory) of their contents. An array
with another array inside of it, for instance, consists of (at least)
one memory region for the inner array and another for the outer array,
containing (among other things) a number that represents the address of
the inner array.

If you want to save data in a file for later or send it to another
computer over the network, you have to somehow convert these tangles of
memory addresses to a description that can be stored or sent. You could
send over your entire computer memory along with the address of the
value you're interested in, but that doesn't seem like the best
approach.

What we can do instead is **serialize** the data. That means it is
converted into a _flat description_. A popular serialization format is
called **JSON** (pronounced "Jason"), which stands for JavaScript Object
Notation. It is widely used as a data storage and communication format
on the web, even with languages other than JavaScript.

JSON looks similar to JavaScript's way of writing arrays and objects,
with a few restrictions. All property names have to be surrounded by
double quotes, and only simple data expressions are allowed — no
function calls, bindings, or anything that involves actual computation.
Comments are not allowed in JSON.

JavaScript gives us the functions `JSON.stringify` and `JSON.parse` to
convert data to and from this format. The first takes a JavaScript value
and returns a JSON-encoded string. The second takes such a string and
converts it to the value it encodes:

```ts
const string = JSON.stringify({ squirrel: false, events: ["weekend"] });
console.log(string); // => '{"squirrel":false,"events":["weekend"]}'
console.log(JSON.parse(string).events); // => ["weekend"]
```
