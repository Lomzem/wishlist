// Bun can't run Vite's enhanced-img imports, so the test loads the Wish data with a stub image
// in their place. The real images are checked in the built page.
import { plugin } from 'bun';

plugin({
	name: 'stub enhanced-img imports',
	setup(build) {
		build.onResolve({ filter: /\?enhanced(&|$)/ }, ({ path }) => ({
			path,
			namespace: 'enhanced-img-stub'
		}));
		build.onLoad({ filter: /.*/, namespace: 'enhanced-img-stub' }, () => ({
			contents: 'export default { sources: {}, img: { src: "", w: 0, h: 0 } };',
			loader: 'js'
		}));
	}
});
