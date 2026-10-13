import type { Picture } from '@sveltejs/enhanced-img';
import giftBox from './assets/wish-images/placeholder-gift-box.png?enhanced&w=192;96';
import waterBottle from './assets/wish-images/placeholder-water-bottle.png?enhanced&w=192;96';

/** One thing Lawjay would like to receive. See GLOSSARY.md. */
export type Wish = {
	name: string;
	/**
	 * Product image. Save it in src/lib/assets/wish-images/ and import it above with the
	 * `?enhanced&w=192;96` query, which sizes it for the 96px tile at 1x and 2x.
	 */
	image?: Picture;
};

/** The Wish List, in display order. Edit this array to change the published page. */
export const wishList: Wish[] = [
	{ name: 'Placeholder wish one', image: giftBox },
	{ name: 'Placeholder wish two', image: waterBottle },
	{ name: 'Placeholder wish three' }
];
