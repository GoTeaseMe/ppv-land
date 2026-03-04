import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'PPV Land',
		short_name: 'PPV Land',
		description: 'Fund creators. Get exclusive content fast.',
		start_url: '/',
		display: 'standalone',
		background_color: '#fefce8',
		theme_color: '#f59e0b',
		icons: [
			{
				src: '/icon-192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/icon-512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	};
}
