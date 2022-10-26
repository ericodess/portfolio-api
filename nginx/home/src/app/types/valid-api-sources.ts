import { ApiSource } from './api-source';

export default [
	{
		name: 'Portfolio',
		rootUrl: 'api.ericodesu.com',
		rootPath: 'portfolio',
		isSecure: true,
		endpoints: [
			{
				name: 'Projects',
				method: 'GET',
				path: 'projects',
				version: 1,
			},
		],
	},
	{
		name: 'Namah',
		rootUrl: 'api.ericodesu.com',
		rootPath: 'namah',
		isSecure: true,
		endpoints: [
			{
				name: 'Auth',
				method: 'POST',
				path: 'auth',
				version: 1,
				requestParams: {
					body: {
						email: 'namahcast@big-bang-web.br',
						password: '123456',
					},
				},
			},
			{
				name: 'Courses',
				method: 'GET',
				path: 'courses',
				version: 1,
				variants: [
					{
						name: 'Courses by Id',
						method: 'GET',
						path: '?id=12023154',
						version: 1,
					},
					{
						name: 'Courses by Author',
						method: 'GET',
						path: '?author=Fernanda%20Cunha',
						version: 1,
					},
					{
						name: 'Courses with limit',
						method: 'GET',
						path: '?limit=2',
						version: 1,
					},
				],
			},
			{
				name: 'Podcasts',
				method: 'GET',
				path: 'podcasts',
				version: 1,
				variants: [
					{
						name: 'Podcasts by Id',
						method: 'GET',
						path: '?id=121',
						version: 1,
					},
					{
						name: 'Podcasts by Author',
						method: 'GET',
						path: '?author=Namahcast',
						version: 1,
					},
					{
						name: 'Podcasts with limit',
						method: 'GET',
						path: '?limit=2',
						version: 1,
					},
				],
			},
			{
				name: 'Posts',
				method: 'GET',
				path: 'posts',
				version: 1,
				variants: [
					{
						name: 'Posts by Id',
						method: 'GET',
						path: '?id=681',
						version: 1,
					},
					{
						name: 'Posts by Author',
						method: 'GET',
						path: '?author=Namahblogger',
						version: 1,
					},
				],
			},
			{
				name: 'Projects',
				method: 'GET',
				path: 'projects',
				version: 1,
				variants: [
					{
						name: 'Projects by Id',
						method: 'GET',
						path: '?id=39',
						version: 1,
					},
					{
						name: 'Projects with limit',
						method: 'GET',
						path: '?limit=3',
						version: 1,
					},
				],
			},
			{
				name: 'Users',
				method: 'GET',
				path: 'users',
				version: 1,
				variants: [
					{
						name: 'Users by Name',
						method: 'GET',
						path: '?name=Namahcast',
						version: 1,
					},
				],
			},
			{
				name: 'Banners',
				method: 'GET',
				path: 'banners',
				version: 1,
				variants: [
					{
						name: 'Banner by Id',
						method: 'GET',
						path: '?id=552',
						version: 1,
					},
				],
			},
			{
				name: 'Search',
				method: 'GET',
				path: 'search?q=Namahblogger',
				version: 1,
			},
			{
				name: 'Concepts',
				method: 'GET',
				path: 'concepts',
				version: 1,
				variants: [
					{
						name: 'Concepts with limit',
						method: 'GET',
						path: '?limit=3',
						version: 1,
					},
				],
			},
		],
	},
] as ApiSource[];
