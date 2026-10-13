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
function wishElements() {
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
	test('has one entry per Wish, in data order', () => {
		const entries = wishElements();
		expect(entries.length).toBe(wishList.length);
		entries.forEach((entry, i) => expect(text(entry)).toContain(wishList[i].name));
	});

	test('only Wishes with an image show one, described by the Wish name', () => {
		const entries = wishElements();
		entries.forEach((entry, i) => {
			const images = entry.querySelectorAll('img');
			if (wishList[i].image) {
				expect(images.length).toBe(1);
				expect(images[0].getAttribute('alt')).toBe(wishList[i].name);
			} else {
				expect(images.length).toBe(0);
			}
		});
	});

	test('exactly the Really Want Wishes show the "really want!" badge', () => {
		const entries = wishElements();
		entries.forEach((entry, i) => {
			expect(text(entry).includes('really want!')).toBe(!!wishList[i].reallyWant);
		});
	});

	test("a Wish's Note shows as its paragraphs, outside any link; a Wish without one shows none", () => {
		const entries = wishElements();
		entries.forEach((entry, i) => {
			const paragraphs = [...entry.querySelectorAll('p')];
			const expected =
				wishList[i].note?.split(/\n\s*\n/).map((p) => p.replace(/\s+/g, ' ').trim()) ?? [];
			expect(paragraphs.map(text)).toEqual(expected);
			for (const p of paragraphs) expect(p.closest('a')).toBeNull();
		});
	});

	test("a linked Wish's name and tile go to its link, with only the name exposed; an unlinked Wish has no anchor", () => {
		const entries = wishElements();
		entries.forEach((entry, i) => {
			const { name, link } = wishList[i];
			const anchors = [...entry.querySelectorAll('a')];
			if (link) {
				for (const anchor of anchors) expect(anchor.getAttribute('href')).toBe(link);
				const exposed = anchors.filter((a) => a.getAttribute('aria-hidden') !== 'true');
				expect(exposed.map(text)).toEqual([name]);
				const hidden = anchors.filter((a) => a.getAttribute('aria-hidden') === 'true');
				expect(hidden.length).toBe(1);
				expect(hidden[0].getAttribute('tabindex')).toBe('-1');
			} else {
				expect(anchors.length).toBe(0);
			}
		});
	});

	test('no purchase link opens in a new tab', () => {
		for (const entry of wishElements()) {
			for (const anchor of entry.querySelectorAll('a'))
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

	test('every stylesheet, script, icon, and image URL starts with /wishlist/', () => {
		const urls = pageUrls();
		expect(urls.length).toBeGreaterThan(0);
		for (const url of urls) expect(url).toStartWith(BASE);
	});
});
