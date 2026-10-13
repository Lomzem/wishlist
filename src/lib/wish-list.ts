import type { Picture } from '@sveltejs/enhanced-img';
import couchPillows from './assets/wish-images/couch-pillows.jpg?enhanced&w=192;96';
import headphoneStand from './assets/wish-images/headphone-stand.jpg?enhanced&w=192;96';
import mushroomLamp from './assets/wish-images/mushroom-lamp.webp?enhanced&w=192;96';
import sleepingPillow from './assets/wish-images/sleeping-pillow.webp?enhanced&w=192;96';

const stockPhoto =
	"The photo is just a stock image. It doesn't have to be this exact model or brand.";

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
	{ name: 'Couch pillows', image: couchPillows, note: stockPhoto },
	{ name: 'Headphone stand', image: headphoneStand, note: stockPhoto },
	{
		name: 'Cool looking lamp',
		image: mushroomLamp,
		note: `I think mushroom lamps look cool :)

${stockPhoto}`
	},
	{ name: 'Quality sleeping pillow', image: sleepingPillow, note: stockPhoto }
];
