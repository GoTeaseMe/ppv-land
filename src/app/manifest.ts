import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'GoTeaseMe',
		short_name: 'GoTeaseMe',
		description: 'Fund creators. Unlock exclusive content.',
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
