import type { Picture } from '@sveltejs/enhanced-img';
import giftBox from './assets/wish-images/placeholder-gift-box.png?enhanced&w=192;96';
import waterBottle from './assets/wish-images/placeholder-water-bottle.png?enhanced&w=192;96';

/** One thing Lawjay would like to receive. See GLOSSARY.md. */
export type Wish = {
	name: string;
	/** Shows the "really want!" badge. See **Really Want** in GLOSSARY.md. */
	reallyWant?: boolean;
	/** Purchase link. Without one, the name shows as plain text. */
	link?: string;
	/**
	 * Product image. Save it in src/lib/assets/wish-images/ and import it above with the
	 * `?enhanced&w=192;96` query, which sizes it for the 96px tile at 1x and 2x.
	 */
	image?: Picture;
	/** What Lawjay wants gift-givers to know. A blank line starts a new paragraph. See **Note** in GLOSSARY.md. */
	note?: string;
};

/** The Wish List, in display order. Edit this array to change the published page. */
export const wishList: Wish[] = [
	{
		name: 'Placeholder wish one',
		link: 'https://example.com/',
		image: giftBox,
		reallyWant: true,
		note: `Placeholder note about wish one. Any colour is fine.

A second paragraph with more detail, long enough to wrap onto another line on a narrow phone.`
	},
	{ name: 'Placeholder wish two', image: waterBottle },
	{ name: 'Placeholder wish three' }
];
