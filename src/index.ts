import process from "node:process";
import whenExit from "when-exit";

export function createCliCursor(stream?: NodeJS.WriteStream) {
	stream ??= process.stdout;

	let isHidden = false;
	let setuped = false;

	// https://github.com/sindresorhus/cli-cursor/blob/main/index.js
	const methods = {
		show() {
			if (!stream.isTTY) {
				return;
			}

			isHidden = false;
			stream.write("\u001B[?25h");
		},
		hide() {
			if (!stream.isTTY) {
				return;
			}

			if (!setuped) {
				setuped = true;
				whenExit(methods.show);
			}

			isHidden = true;
			stream.write("\u001B[?25l");
		},
		toggle(force?: boolean) {
			if (force !== undefined) {
				isHidden = force;
			}

			if (isHidden) {
				methods.show();
			} else {
				methods.hide();
			}
		},
	};

	return methods;
}
