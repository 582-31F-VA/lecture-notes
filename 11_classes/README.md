# Classes

JavaScript's prototype system can be interpreted as a somewhat free-form
take on **classes**. A class defines the _shape_ of a type of object —
that is, what properties it has. Such an object is called an
**instance** of the class.

Prototypes are useful for defining properties for which all instances of
a class share the same value. Properties that differ per instance, such
as our rabbits' `color` property, need to be stored directly in the
objects themselves.

To create an instance of a given class, you have to make an object that
derives from the proper prototype, but you also have to make sure it
itself has the properties that instances of this class are supposed to
have. This is what a **constructor** function does:

```ts
function newRabbit(color: string) {
    const instance = Object.create(protoRabbit);
    instance.color = color;
    return instance;
}
```

JavaScript's class notation makes it easier to define this type of
function, along with a prototype object. The `class` keyword starts a
**class declaration**, which allows us to define a constructor and a set
of properties together.

```ts
class Rabbit {
    color: string;

    constructor(color: string) {
        this.color = color;
    }

    speak(line: string): string {
        return `The ${this.color} rabbit says '${line}'`;
    }
}
```

This code has the effect of defining a binding called `Rabbit`, which
holds a function that runs the code in `constructor` and has a
`prototype` property that holds the `speak` method.

This function cannot be called like a normal function. In JavaScript,
constructors are called by putting the keyword `new` in front of them.
Doing so creates a fresh instance object whose prototype is the object
from the function's `prototype` property, then runs the function with
`this` bound to the new object, and finally returns the object.

```ts
const redRabbit = new Rabbit("red");
```

## Private properties

It is common for classes to define some properties for internal use that
are not part of their interface. These are called **private
properties**, as opposed to public ones, which are part of the object's
external interface.

To declare a private property, put a `#` sign in front of its name. Such
methods can be called only from inside the class declaration that
defines them.

```ts
class SecretiveObject {
    #getSecret(): string {
        return "I ate all the plums";
    }

    interrogate(): string {
        const shallISayIt = this.#getSecret();
        return "never";
    }
}
```

If you try to call `#getSecret` from outside the class, you get an
error. Its existence is entirely hidden inside the class declaration.

## Getters, setters, and statics

Sometimes, the value of a property is not stored directly in the
instance but is instead computed every time it is accessed. These
properties effectively hide method calls. Such methods are called
**getters** and are defined by writing `get` in front of the method
name. You can do a similar thing when a property is written to, using a
**setter**.

```ts
class Temperature {
    constructor(celsius: number) {
        this.celsius = celsius;
    }

    get fahrenheit(): number {
        return this.celsius * 1.8 + 32;
    }

    set fahrenheit(value: number) {
        this.celsius = (value - 32) / 1.8;
    }
}
```

The `Temperature` class, for instance, allows you to read and write the
temperature in either degrees Celsius or degrees Fahrenheit, but
internally it stores only Celsius and automatically converts to and from
Celsius in the `fahrenheit` getter and setter.

Sometimes you want to attach some properties directly to your
constructor function rather than to the prototype. Such methods won't
have access to a class instance but can, for example, be used to provide
additional ways to create instances.

```ts
class Temperature {
    // ...

    static fromFahrenheit(value): Temperature {
        return new Temperature((value - 32) / 1.8);
    }
}
```

Inside a class declaration, methods or properties that have `static`
written before their name are stored on the constructor. For example,
the `Temperature` class allows you to write
`Temperature.fromFahrenheit(100)` to create a temperature using degrees
Fahrenheit.

## Inheritance

In JavaScript, the use of the word `extends` indicates that a class is a
**subclass** of another class, called its **superclass**. A subclass
inherits all the properties of its superclass.

```ts
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Student extends Person {
    school: string;

    constructor(name: string, school: string) {
        super(name);
        this.school = school;
    }

    greet(): string {
        return `I'm ${this.name} and I go to ${this.school}`;
    }
}
```

The built-in function `super` calls the superclass's constructor.
