import type { Metadata } from 'next';
import { Sansita } from 'next/font/google';
import './globals.css';

const sansitaSans = Sansita({
	variable: '--font-sansita-sans',
	subsets: ['latin'],
	weight: ['400', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: {
		default: 'PPV Land — Fund Creators. Get Exclusive Content Fast.',
		template: '%s | PPV Land',
	},
	description:
		'A new crowdfunding platform for creators (including an adult section). Fund campaigns, unlock exclusive content, and discover new talent.',
	keywords: [
		'crowdfunding',
		'creators',
		'exclusive content',
		'patreon alternative',
		'fan funding',
		'creator platform',
		'content monetization',
	],
	authors: [{ name: 'PPV Land' }],
	creator: 'PPV Land',
	publisher: 'PPV Land',
	metadataBase: new URL('https://ppvland.com'),
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://ppvland.com',
		title: 'PPV Land — Fund Creators. Get Exclusive Content Fast.',
		description:
			'A new crowdfunding platform for creators. Fund campaigns, unlock exclusive content, and discover new talent.',
		siteName: 'PPV Land',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'PPV Land — Fund Creators. Get Exclusive Content Fast.',
		description:
			'A new crowdfunding platform for creators. Fund campaigns, unlock exclusive content, and discover new talent.',
		creator: '@ppvland',
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
			<body className={`${sansitaSans.className} antialiased`}>{children}</body>
		</html>
	);
}
