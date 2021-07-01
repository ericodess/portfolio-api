const path = require('path');

module.exports = {
	basePath: '/admin',
  	reactStrictMode: true,
  	useFileSystemPublicRoutes: false,
  	sassOptions: {
  	  includePaths: [path.join(__dirname, 'styles')],
  	},
  	async rewrites() {
  		return [
			{
				source: '/:path*',
				destination: '/:path*',
			},
			{
				source: '/api/:path*',
				destination: '/_error',
			},
			{
				source: '/service/:path*',
				destination: '/api/:path*',
			},
		]
  	},
};