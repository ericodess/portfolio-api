const path = require('path');

module.exports = {
	reactStrictMode: true,
	useFileSystemPublicRoutes: false,
	sassOptions: {
		includePaths: [path.join(__dirname, 'pages/_app/styles')],
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/admin',
				permanent: true,
			},
			{
				source: '/admin',
				destination: '/admin/login',
				permanent: true,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: '/_error',
			},
			{
				source: '/:path*',
				destination: '/:path*',
			},
			{
				source: '/admin/:path*',
				destination: '/:path*',
			},
			{
				source: '/service/:path*',
				destination: '/api/routes/:path*',
			},
		];
	},
};
