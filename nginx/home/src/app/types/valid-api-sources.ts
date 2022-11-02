import { ApiSource } from './api-source';

// Environment Variables
import { environment } from 'src/environments/environment';

const rootUrl = 'api.ericodesu.com';
const isSecure = environment.production;

export default [
	{
		name: 'Projects',
		rootUrl: rootUrl,
		rootPath: 'projects',
		isSecure: isSecure,
		endpoints: [
			{
				name: 'List',
				method: 'GET',
				path: '',
				version: 1,
			},
		],
	},
	{
		name: 'Namah',
		rootUrl: rootUrl,
		rootPath: 'namah',
		isSecure: isSecure,
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
						version: 1,
						requestParams: {
							searchParams: {
								id: 12023154,
							},
						},
					},
					{
						name: 'Courses by Author',
						method: 'GET',
						version: 1,
						requestParams: {
							searchParams: {
								author: 'Fernanda Cunha',
							},
						},
					},
					{
						name: 'Courses with limit',
						method: 'GET',
						version: 1,
						requestParams: {
							searchParams: {
								limit: 2,
							},
						},
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
						version: 1,
						requestParams: {
							searchParams: {
								id: 121,
							},
						},
					},
					{
						name: 'Podcasts by Author',
						method: 'GET',
						version: 1,
						requestParams: {
							searchParams: {
								author: 'Namahcast',
							},
						},
					},
					{
						name: 'Podcasts with limit',
						method: 'GET',
						version: 1,
						requestParams: {
							searchParams: {
								limit: 2,
							},
						},
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
						version: 1,
						requestParams: {
							searchParams: {
								id: 681,
							},
						},
					},
					{
						name: 'Posts by Author',
						method: 'GET',
						version: 1,
						requestParams: {
							searchParams: {
								author: 'Namahblogger',
							},
						},
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
						version: 1,
						requestParams: {
							searchParams: {
								id: 39,
							},
						},
					},
					{
						name: 'Projects with limit',
						method: 'GET',
						version: 1,
						requestParams: {
							searchParams: {
								limit: 3,
							},
						},
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
						version: 1,
						requestParams: {
							searchParams: {
								name: 'Namahcast',
							},
						},
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
						version: 1,
						requestParams: {
							searchParams: {
								id: 552,
							},
						},
					},
				],
			},
			{
				name: 'Search',
				method: 'GET',
				path: 'search',
				version: 1,
				requestParams: {
					searchParams: {
						q: 'Namahblogger',
					},
				},
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
						version: 1,
						requestParams: {
							searchParams: {
								limit: 3,
							},
						},
					},
				],
			},
		],
	},
] as ApiSource[];
