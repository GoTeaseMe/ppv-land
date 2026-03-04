import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	const baseUrl = 'https://ppvland.com';

	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/api/', '/_next/', '/static/'],
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
