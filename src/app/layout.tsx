import type { Metadata } from 'next';
import { Sansita } from 'next/font/google';
import './globals.css';

const sansitaSans = Sansita({
	variable: '--font-sansita-sans',
	subsets: ['latin'],
	weight: ['400', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Coming Soon — Fund Creators. Get Exclusive Content Fast.',
	description:
		'A new crowdfunding platform for creators (including an adult section). Fund campaigns, unlock exclusive content, and discover new talent.',
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
