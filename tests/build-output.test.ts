/// <reference types="bun" />
// Checks the prerendered page in build/. Run `bun run build` first.
import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseHTML } from 'linkedom';
import { wishList } from '../src/lib/wish-list';

const BASE = '/wishlist/';
const indexPath = resolve(import.meta.dir, '../build/index.html');

if (!existsSync(indexPath)) {
	throw new Error(`${indexPath} not found. Run \`bun run build\` before \`bun test\`.`);
}

const { document } = parseHTML(readFileSync(indexPath, 'utf8'));

const text = (el: Element | null) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();

/** The single Wish List on the page, one `<li>` per Wish. */
function wishItems() {
	const lists = document.querySelectorAll('ul');
	expect(lists.length).toBe(1);
	return [...lists[0].querySelectorAll(':scope > li')];
}

describe('page', () => {
	test('has the heading and title', () => {
		expect(text(document.querySelector('h1'))).toBe("Lawjay's Christmas Wish List 🎄");
		expect(text(document.querySelector('title'))).toBe("Lawjay's Wish List");
	});
});

describe('Wish List', () => {
	test('has one item per Wish, in data order', () => {
		const items = wishItems();
		expect(items.length).toBe(wishList.length);
		items.forEach((item, i) => expect(text(item)).toContain(wishList[i].name));
	});

	test("a linked Wish's name is an anchor to its link; an unlinked Wish has no anchor", () => {
		const items = wishItems();
		expect(wishList.some((wish) => wish.link)).toBe(true);
		expect(wishList.some((wish) => !wish.link)).toBe(true);
		items.forEach((item, i) => {
			const { name, link } = wishList[i];
			const anchors = item.querySelectorAll('a');
			if (link) {
				expect(anchors.length).toBe(1);
				expect(anchors[0].getAttribute('href')).toBe(link);
				expect(text(anchors[0])).toBe(name);
			} else {
				expect(anchors.length).toBe(0);
			}
		});
	});

	test('no purchase link opens in a new tab', () => {
		for (const item of wishItems()) {
			for (const anchor of item.querySelectorAll('a'))
				expect(anchor.hasAttribute('target')).toBe(false);
		}
	});
});

describe('base path', () => {
	/** Every URL the page loads: stylesheets, scripts, preloads, icons, images, and dynamic imports. */
	function pageUrls() {
		const urls: string[] = [];
		for (const el of document.querySelectorAll('link[href]')) urls.push(el.getAttribute('href')!);
		for (const el of document.querySelectorAll('script[src], img[src]')) {
			urls.push(el.getAttribute('src')!);
		}
		for (const el of document.querySelectorAll('img[srcset], source[srcset]')) {
			for (const candidate of el.getAttribute('srcset')!.split(',')) {
				urls.push(candidate.trim().split(/\s+/)[0]);
			}
		}
		for (const el of document.querySelectorAll('script:not([src])')) {
			for (const [, url] of (el.textContent ?? '').matchAll(/import\(\s*["']([^"']+)["']/g)) {
				urls.push(url);
			}
		}
		return urls;
	}

	test('links a favicon', () => {
		expect(document.querySelector('link[rel~="icon"]')).not.toBeNull();
	});

	test('every stylesheet, script, and icon URL starts with /wishlist/', () => {
		const urls = pageUrls();
		expect(urls.length).toBeGreaterThan(0);
		for (const url of urls) expect(url).toStartWith(BASE);
	});
});
