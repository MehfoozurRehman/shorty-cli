# shorty-cli

An interactive command-line tool that shortens a URL, or looks up the original behind a short link, using the shorty service.

**Status:** Shipped. It is published as an npm package (version 1.0.7 in `package.json`), and the repo has a release script that bumps the version and tags it. I did not check the npm registry.

## The problem

Sharing a long link from a terminal means leaving it for a web page to shorten it. This tool lets someone do both steps from the command line.

## What it does

- **Shorten a URL:** asks for a URL, sends it to the shorty API, and prints the short link.
- **Find a URL:** takes a short link, checks that it points at the shorty domain, and prints the original URL.
- **Interactive menu:** choose between the two actions from a list (`inquirer`).
- **Progress and colour:** a spinner (`ora`) while the request runs, and coloured messages for results and errors.
- **Error messages:** API errors are shown in red, and a rejected request prints its message.

## How it's built

- A single ES module, `index.js`, with `axios` for HTTP calls to the shorty API and `inquirer` for prompts.
- The `bin` entry in `package.json` points to `index.min.js`, which is not committed. `publish.js` creates it with `terser`, bumps the patch version, commits, tags and pushes.
- Published as a global command named `shorty`.

## Running it locally

Requires Node.js.

```bash
npm install
node index.js       # runs the interactive prompt from the source file
```

Installing the published package:

```bash
npm install -g shorty-cli
```

`npm run new-version` runs `publish.js`. That command edits `package.json`, creates `index.min.js`, and runs `git add .`, a commit, a tag and `git push`. Read it before running it.

## What's left

- **URL not encoded:** the shorten request puts the URL straight into the query string (`"/?url=" + url`), so a URL containing `&` or `#` will be cut short. It should be encoded.
- **Debug output on lookup:** the find path prints the whole API response with `console.log` before the result.
- **Minified file not in git:** the `bin` target only exists after `publish.js` has run, so a fresh clone cannot run the global command.
- **No tests**, and the API address is hard-coded.
