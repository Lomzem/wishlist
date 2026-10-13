import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		enhancedImages(), // must come before the SvelteKit plugin
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			paths: {
				// GitHub project site: served under /wishlist/. The dev server stays at the root.
				base: process.argv.includes('dev') ? '' : '/wishlist',
				// Emit absolute /wishlist/... asset URLs rather than ./... relative ones.
				relative: false
			}
		})
	]
});
