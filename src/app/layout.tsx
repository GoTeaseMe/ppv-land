import type { Metadata } from 'next';
import { Sansita } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

const sansitaSans = Sansita({
	variable: '--font-sansita-sans',
	subsets: ['latin'],
	weight: ['400', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: {
		default: 'GoTeaseMe — Fund Creators. Unlock Exclusive Content.',
		template: '%s | GoTeaseMe',
	},
	description:
		'A crowdfunding platform for creators. Fund campaigns, unlock exclusive content, and discover new talent. Join the community and support your favorite creators.',
	keywords: [
		'crowdfunding',
		'creators',
		'exclusive content',
		'patreon alternative',
		'fan funding',
		'creator platform',
		'content monetization',
		'tease',
	],
	authors: [{ name: 'GoTeaseMe' }],
	creator: 'GoTeaseMe',
	publisher: 'GoTeaseMe',
	metadataBase: new URL('https://goteaseme.com'),
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://goteaseme.com',
		title: 'GoTeaseMe — Fund Creators. Unlock Exclusive Content.',
		description:
			'A crowdfunding platform for creators. Fund campaigns, unlock exclusive content, and discover new talent.',
		siteName: 'GoTeaseMe',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'GoTeaseMe — Fund Creators. Unlock Exclusive Content.',
		description:
			'A crowdfunding platform for creators. Fund campaigns, unlock exclusive content, and discover new talent.',
		creator: '@goteaseme',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'your-google-verification-code',
		// yandex: 'your-yandex-verification-code',
		// yahoo: 'your-yahoo-verification-code',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html data-theme="bumblebee" lang="en">
			<body className={`${sansitaSans.className} antialiased`}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
