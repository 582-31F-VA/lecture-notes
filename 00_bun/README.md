# Bun

To install Bun, we recommend using a package manager such as [Scoop] on
Windows and [Homebrew] for those on Mac. On Linux, it depends on your
distribution.

Windows:

```sh
scoop install bun
```

Mac:

```sh
brew install oven-sh/bun/bun
```

[Scoop]: https://scoop.sh
[Homebrew]: https://brew.sh

## Usage

Before starting a homework or an exercise, we recommend running the
following command to initialize a new project (replace `<name>` with the
name of the homework or exercise):

```sh
bun create 582-31F-VA/starter <name>
```

This command creates a directory with all the necessary configuration
files. You can then use `cd <name>` to change your location to `<name>`,
and run `bun dev` to launch a development server.
