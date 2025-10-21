# Exceptions

When a function cannot proceed normally, what we would often like to do
is just stop what we are doing and immediately jump to a place that
knows how to handle the problem. This is what **exception handling**
does.

## Throwing

Exceptions are a mechanism that makes it possible for code that runs
into a problem to **raise** (or **throw**) an exception. Raising an
exception somewhat resembles a super-charged return from a function: it
jumps out of not just the current function but also its callers, all the
way down to the first call that started the current execution. This is
called _unwinding the stack_.

Here's an example:

```ts
type Account = { balance: number };

function withdraw(acc: Account, amount: number): Account {
    if (acc.balance < amount) {
        throw new Error(
            `withdrawing "${amount}", but insufficient funds: "${acc.balance}"`,
        );
    }
    return { balance: acc.balance - amount };
}
```

The `throw` keyword is used to raise an exception. In this case, we used
the `Error` constructor to create our exception value. This is a
standard JavaScript constructor that creates an object with a `message`
property. This message is used by developers for debugging. It should be
lowercase, and include information about the error.

If you call `withdraw` with an amount smaller than the account's
balance, you will get the following error message:

```
Uncaught Error: withdrawing "10", but insufficient funds: "0"
```

Instances of `Error` also gather information about the call stack that
existed when the exception was created, a so-called _stack trace_. This
information is stored in the `stack` property and can be helpful when
trying to debug a problem: it tells us the function where the problem
occurred and which functions made the failing call.

## Catching

If exceptions always zoomed right down to the bottom of the stack, they
would not be of much use. They'd just provide a novel way to blow up
your program. Their power lies in the fact that you can set "obstacles"
along the stack to _catch_ the exception as it is zooming down. Once
you've caught an exception, you can do something with it to address the
problem and then continue to run the program.

```ts
function main(): void {
    const account = { balance: 0 };
    const amount = Number(prompt("Amount to withdraw:"));
    try {
        withdraw(account, amount);
    } catch (error) {
        console.error(`Insufficient funds: ${account.balance}`);
    }
}
```

Catching an exception is done by wrapping a piece of code in a `try`
block, followed by the keyword `catch`. When the code in the `try` block
causes an exception to be raised, the `catch` block is evaluated, with
the name in parentheses (in this case, `error`) bound to the exception
value. After the `catch` block finishes — or if the `try` block finishes
without problems — the program proceeds beneath the entire `try`/`catch`
statement.
