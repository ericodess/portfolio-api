const path = require('path');

module.exports = {
  	reactStrictMode: true,
  	useFileSystemPublicRoutes: false,
  	sassOptions: {
  		includePaths: [path.join(__dirname, 'styles')],
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
		]
  	},
};