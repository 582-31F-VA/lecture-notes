# Modules

Ideally, a program has a clear, straightforward structure. The way it
works is easy to explain, and each part plays a well-defined role.

In practice, programs grow organically. Pieces of functionality are
added as the programmer identifies new needs. Keeping such a program
well structured requires constant attention and work. This is work that
will pay off only in the future, the next time someone works on the
program, so it's tempting to neglect it and allow the various parts of
the program to become deeply entangled.

This causes two practical issues. First, understanding an entangled
system is hard. If everything can touch everything else, it is difficult
to look at any given piece in isolation. You are forced to build up a
holistic understanding of the entire thing. Second, if you want to use
any of the functionality from such a program in another situation,
rewriting it may be easier than trying to disentangle it from its
context.

The phrase "big ball of mud" is often used for such large, structureless
programs. Everything sticks together, and when you try to pick out a
piece, the whole thing comes apart, and you succeed only in making a
mess.

## Modular programs

**Modules** are an attempt to avoid these problems. A module is a piece
of program that specifies which other pieces it relies on and which
functionality it provides for other modules to use (its **interface**).

Module interfaces have a lot in common with object interfaces. They make
part of the module available to the outside world and keep the rest
private. But the interface that a module provides for others to use is
only half the story. A good module system also requires modules to
specify which code they use from other modules. These relations are
called **dependencies**. If module A uses functionality from module B,
it is said to _depend_ on that module. When these are clearly specified
in the module itself, they can be used to figure out which other modules
need to be present to be able to use a given module and to automatically
load dependencies.

When the ways in which modules interact with each other are explicit, a
system becomes more like LEGO, where pieces interact through
well-defined connectors, and less like mud, where everything mixes with
everything else.

## ES modules

The original JavaScript language did not have any concept of a module.
All scripts ran in the same scope, and accessing a function defined in
another script was done by referencing the global bindings created by
that script. This actively encouraged accidental, hard-to-see
entanglement of code and invited problems like unrelated scripts trying
to use the same binding name.

Since ECMAScript 2015, JavaScript supports two different types of
programs. _Scripts_ behave in the old way: their bindings are defined in
the global scope, and they have no way to directly reference other
scripts. _Modules_ get their own separate scope and support the `import`
and `export` keywords, which aren't available in scripts, to declare
their dependencies and interface. This module system is usually called
_ES modules_ (where ES stands for ECMAScript).

A modular program is composed of a number of such modules, wired
together via their imports and exports.

The following example module converts between day names and numbers. It
defines a constant `names` that is not part of its interface, and two
functions that are. It has no dependencies.

```ts
// dayname.ts

const names = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export function dayName(n: number): string {
    return names[n];
}

export function dayNumber(name: string): number {
    return names.indexOf(name);
}
```

The `export` keyword can be put in front of a function, class, or
binding definition to indicate that that binding is part of the module's
interface. This makes it possible for other modules to use that binding
by importing it.

```ts
// index.ts

import { dayName } from "./dayname.ts";

const now = new Date();
console.log(`Today is ${dayName(now.getDay())}`);
```

The `import` keyword, followed by a list of binding names in braces,
makes bindings from another module available in the current module.
Modules are identified by quoted strings.

How such a module name is resolved to an actual program differs by
platform. The browser treats them as web addresses, whereas execution
environment such as Node, Bun and Deno resolves them to files. When you
run a module, all the other modules it depends on — and the modules
those depend on — are loaded, and the exported bindings are made
available to the modules that import them.

Import and export declarations cannot appear inside of functions, loops,
or other blocks. They are immediately resolved when the module is
loaded, regardless of how the code in the module executes. To reflect
this, they must appear only in the outer module body.

### Default export

A module may also have a special export named `default`, which is often
used for modules that only export a single binding. To define a default
export, you write `export default` before an expression, a function
declaration, or a class declaration.

```ts
// seasonname.ts

export default ["Winter", "Spring", "Summer", "Autumn"];
```

Such a binding is imported by omitting the braces around the name of the
import.

```ts
import seasonNames from "./seasonname.ts";
```

## Module design

Structuring programs is one of the subtler aspects of programming. Any
nontrivial piece of functionality can be organized in various ways.

Good program design is subjective — there are trade-offs involved, and
matters of taste. The best way to learn the value of well-structured
design is to read or work on a lot of programs and notice what works and
what doesn't. Don't assume that a painful mess is "just the way it is".
You can improve the structure of almost everything by putting more
thought into it.

One aspect of module design is ease of use. If you are designing
something that is intended to be used by multiple people — or even by
yourself, in three months when you no longer remember the specifics of
what you did — it is helpful if your interface is simple and
predictable.
