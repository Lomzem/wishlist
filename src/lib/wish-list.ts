/** One thing Lawjay would like to receive. See GLOSSARY.md. */
export type Wish = {
	name: string;
	/** Shows the "really want!" badge. See **Really Want** in GLOSSARY.md. */
	reallyWant?: boolean;
	/** Purchase link. Without one, the name shows as plain text. */
	link?: string;
};

/** The Wish List, in display order. Edit this array to change the published page. */
export const wishList: Wish[] = [
	{ name: 'Placeholder wish one', link: 'https://example.com/', reallyWant: true },
	{ name: 'Placeholder wish two' },
	{ name: 'Placeholder wish three' }
];
