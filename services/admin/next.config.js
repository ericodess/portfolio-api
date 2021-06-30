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
				source: '/pages/:path*',
				destination: '/_error',
			},
			{
				source: '/api/:path*',
				destination: '/_error',
			},
			{
				source: '/dashboard/:path*',
				destination: '/pages/:path*',
			},
			{
				source: '/service/:path*',
				destination: '/api/:path*',
			},
		]
  	},
};