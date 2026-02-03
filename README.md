# kursor-cli

Toogle the CLI cursor. Like [`cli-cursor`](https://github.com/sindresorhus/cli-cursor).

## Install

```sh
$ npm install kursor-cli
```

## Usage

```js
import { createCliCursor } from "kursor-cli";

const cliCursor = createCliCursor(process.stdout);
cliCursor.hide();

setTimeout(() => {
	process.exit(); // Restore the cursor gracefully
}, 3000);
```

## API

Please refer to the `d.ts` file for more information.

## License

[MIT](https://opensource.org/license/mit/)
