import process from "node:process";
import { deepEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { createCliCursor } from "../src/index.ts";
import { Writable } from "node:stream";

class MockWritable extends Writable {
	public buffer: string[] = [];
	public isTTY = true;

	_write(chunk: any, _encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
		this.buffer.push(chunk.toString());
		callback();
	}

	get lastBuffer() {
		return this.buffer.at(-1);
	}
}

const SHOW = "\u001B[?25h";
const HIDE = "\u001B[?25l";

describe("basic", () => {
	let output: MockWritable;
	let cliCursor: ReturnType<createCliCursor>;

	beforeEach(() => {
		output = new MockWritable();
		cliCursor = createCliCursor(output);
	});

	test("show", () => {
		cliCursor.show();
		deepEqual(output.lastBuffer, SHOW);
	});

	test("hide", () => {
		cliCursor.hide();
		deepEqual(output.lastBuffer, HIDE);
	});
});

describe("toggler", () => {
	let output: MockWritable;
	let cliCursor: ReturnType<createCliCursor>;

	beforeEach(() => {
		output = new MockWritable();
		cliCursor = createCliCursor(output);
	});

	test("toggle", () => {
		cliCursor.hide();
		cliCursor.toggle();
		deepEqual(output.lastBuffer, SHOW);
	});

	test("toggle 2", () => {
		cliCursor.show();
		cliCursor.toggle();
		deepEqual(output.lastBuffer, HIDE);
	});

	test("toggle force", () => {
		cliCursor.show();
		cliCursor.toggle(true);
		deepEqual(output.lastBuffer, SHOW);
	});

	test("toggle force 2", () => {
		cliCursor.hide();
		cliCursor.toggle(true);
		deepEqual(output.lastBuffer, SHOW);
	});

	test("toggle force 3", () => {
		cliCursor.show();
		cliCursor.toggle(false);
		deepEqual(output.lastBuffer, HIDE);
	});
});
