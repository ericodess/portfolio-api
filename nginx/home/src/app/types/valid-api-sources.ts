import { ApiSource } from './api-source';

// Environment Variables
import { environment } from 'src/environments/environment';

const rootUrl = environment.rootUrl;
const isSecure = environment.production;

export default [
	{
		name: 'Karikariyaki',
		rootUrl: rootUrl,
		rootPath: 'karikariyaki',
		isSecure: isSecure,
		endpoints: [
			{
				name: 'Sign In',
				method: 'POST',
				path: 'operator/sign-in',
				version: 1,
				requestParams: {
					body: {
						userName: 'demo_operator',
					},
				},
			},
			{
				name: 'Sign Out',
				method: 'POST',
				path: 'operator/sign-out',
				version: 1,
			},
			{
				name: 'Menus',
				method: 'GET',
				path: 'registry/menu',
				version: 1,
				credentials: 'include',
				variants: [
					{
						name: 'Operator Menus',
						method: 'GET',
						path: 'self',
						version: 1,
					},
					{
						name: 'Menus by Id',
						method: 'GET',
						version: 1,
						requestParams: {
							searchParams: {
								id: '6459169e414bf5d047eeb4c3',
							},
						},
					},
					{
						name: 'Menus by Title',
						method: 'GET',
						version: 1,
						requestParams: {
							searchParams: {
								title: 'MENU_HOME_TITLE',
							},
						},
					},
					{
						name: 'Menu by Parent Id',
						method: 'GET',
						version: 1,
						requestParams: {
							searchParams: {
								parentId: '6459169e414bf5d047eeb4c3',
							},
						},
					},
					{
						name: 'Create Menu',
						method: 'POST',
						version: 1,
						requestParams: {
							body: {
								title: '',
								icon: '',
								route: '',
								parentId: '',
							},
						},
					},
					{
						name: 'Update Menu',
						method: 'UPDATE',
						version: 1,
					},
					{
						name: 'Delete Menu',
						method: 'DELETE',
						version: 1,
					},
				],
			},
		],
	},
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
				variants: [
					{
						name: 'Regular',
						method: 'GET',
						path: 'regular',
						version: 1,
					},
					{
						name: 'Testable',
						method: 'GET',
						path: 'testable',
						version: 1,
					},
				],
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
				name: 'Products',
				method: 'GET',
				path: 'products',
				version: 1,
				variants: [
					{
						name: 'Products by Id',
						method: 'GET',
						version: 1,
						requestParams: {
							searchParams: {
								id: 39,
							},
						},
					},
					{
						name: 'Products with limit',
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
