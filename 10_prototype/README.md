# Prototype

In JavaScript, objects inherit the properties of a parent object known
as its **prototype**. When an object gets a request for a property that
it doesn't have, its prototype is searched for the property. If the
prototype doesn't know the property either, the prototype's prototype is
searched, and so on until an object without prototype is reached.

```ts
console.log({}.toString); // => [Function: toString]
```

Here, it looks like we just pulled a property out of an empty object,
but in fact `toString` is a property of `Object.prototype`, which is the
prototype of all object literals.

Many objects don't directly have `Object.prototype` as their prototype,
but instead have another object that provides a different set of default
properties. Hence, functions derive from `Function.prototype`, and
arrays derive from `Array.prototype`.

We can use `Object.create` to create an object with a specific
prototype.

```ts
const protoRabbit = {
    speak(line: string): string {
        return `The ${this.color} rabbit says '${line}'`;
    },
};

const blackRabbit = Object.create(protoRabbit);
blackRabbit.color = "black";
console.log(blackRabbit.speak("I am fear and darkness"));
// => The black rabbit says 'I am fear and darkness'
```

The "proto" rabbit acts as a container for the properties shared by all
rabbits — in this case, `speak`. An individual rabbit object, like the
black rabbit, contains properties that apply only to itself — its
`color` — and derives shared properties from its prototype.
