import { ApiSource } from './api-source';

// Environment Variables
import { environment } from 'src/environments/environment';

const rootUrl = environment.rootUrl;
const isSecure = environment.production;

export default [
	{
		name: 'Karikariyaki',
		description: 'Fast food management system',
		rootUrl: rootUrl,
		rootPath: 'karikariyaki',
		isSecure: isSecure,
		endpoints: [
			{
				name: 'Sign In',
				path: 'operator/sign-in',
				version: 1,
				credentials: 'include',
				variants: [
					{
						method: 'POST',
						parameters: {
							body: [
								{
									label: 'userName',
									defaultValue: '',
									type: 'string',
								},
							],
						},
					},
				],
			},
			{
				name: 'Sign Out',
				path: 'operator/sign-out',
				version: 1,
				credentials: 'include',
				variants: [
					{
						method: 'POST',
					},
				],
			},
			{
				name: 'Menus',
				path: 'registry/menu',
				version: 1,
				credentials: 'include',
				variants: [
					{
						name: 'Search Menus',
						method: 'GET',
						parameters: {
							query: [
								{
									label: 'id',
									defaultValue: '',
									type: 'string',
								},
								{
									label: 'title',
									defaultValue: '',
									type: 'string',
								},
								{
									label: 'parentId',
									defaultValue: '',
									type: 'string',
								},
							],
						},
					},
					{
						name: 'Create Menu',
						method: 'POST',
						parameters: {
							body: [
								{
									label: 'title',
									defaultValue: '',
									type: 'string',
								},
								{
									label: 'icon',
									defaultValue: '',
									type: 'base64',
								},
								{
									label: 'route',
									defaultValue: '',
									type: 'string',
								},
								{
									label: 'parentId',
									defaultValue: '',
									type: 'string',
								},
							],
						},
					},
					{
						name: 'Update Menu',
						method: 'UPDATE',
						parameters: {
							body: [
								{
									label: 'title',
									defaultValue: '',
									type: 'string',
								},
								{
									label: 'icon',
									defaultValue: '',
									type: 'base64',
								},
								{
									label: 'route',
									defaultValue: '',
									type: 'string',
								},
							],
							search: [
								{
									label: 'id',
									defaultValue: '',
									type: 'string',
								},
							],
						},
					},
					{
						name: 'Delete Menu',
						method: 'DELETE',
						parameters: {
							search: [
								{
									label: 'id',
									defaultValue: '',
									type: 'string',
								},
							],
						},
					},
				],
			},
			{
				name: 'Operator Menus',
				path: 'registry/menu/self',
				version: 1,
				credentials: 'include',
				variants: [
					{
						name: 'Operator Menus',
						method: 'GET',
					},
				],
			},
		],
	},
	{
		name: 'Projects',
		description: 'Listing of my projects',
		rootUrl: rootUrl,
		rootPath: 'projects',
		isSecure: isSecure,
		endpoints: [
			{
				name: 'All',
				version: 1,
				variants: [
					{
						method: 'GET',
					},
				],
			},
			{
				name: 'Regular',
				path: 'regular',
				version: 1,
				variants: [
					{
						method: 'GET',
					},
				],
			},
			{
				name: 'Testable',
				path: 'testable',
				version: 1,
				variants: [
					{
						method: 'GET',
					},
				],
			},
		],
	},
	{
		name: 'Namah',
		description: 'E-commerce / blog mock up',
		rootUrl: rootUrl,
		rootPath: 'namah',
		isSecure: isSecure,
		endpoints: [
			{
				name: 'Auth',
				path: 'auth',
				version: 1,

				variants: [
					{
						method: 'POST',
						parameters: {
							body: [
								{
									label: 'email',
									defaultValue: 'namahcast@big-bang-web.br',
									type: 'string',
								},
								{
									label: 'password',
									defaultValue: '123456',
									type: 'string',
								},
							],
						},
					},
				],
			},
			{
				name: 'Courses',
				path: 'courses',
				version: 1,
				variants: [
					{
						method: 'GET',
						parameters: {
							query: [
								{
									label: 'id',
									defaultValue: '12023154',
									type: 'string',
								},
								{
									label: 'author',
									defaultValue: 'Fernanda Cunha',
									type: 'string',
								},
								{
									label: 'limit',
									defaultValue: '2',
									type: 'number',
								},
							],
						},
					},
				],
			},
			{
				name: 'Podcasts',
				path: 'podcasts',
				version: 1,
				variants: [
					{
						method: 'GET',
						parameters: {
							query: [
								{
									label: 'id',
									defaultValue: '121',
									type: 'string',
								},
								{
									label: 'author',
									defaultValue: 'Namahcast',
									type: 'string',
								},
								{
									label: 'limit',
									defaultValue: '2',
									type: 'number',
								},
							],
						},
					},
				],
			},
			{
				name: 'Posts',
				path: 'posts',
				version: 1,
				variants: [
					{
						method: 'GET',
						parameters: {
							query: [
								{
									label: 'id',
									defaultValue: '681',
									type: 'string',
								},
								{
									label: 'author',
									defaultValue: 'Namahblogger',
									type: 'string',
								},
							],
						},
					},
				],
			},
			{
				name: 'Products',
				path: 'products',
				version: 1,
				variants: [
					{
						method: 'GET',
						parameters: {
							query: [
								{
									label: 'id',
									defaultValue: '39',
									type: 'string',
								},
								{
									label: 'limit',
									defaultValue: '3',
									type: 'number',
								},
							],
						},
					},
				],
			},
			{
				name: 'Users',
				path: 'users',
				version: 1,
				variants: [
					{
						method: 'GET',
						parameters: {
							query: [
								{
									label: 'name',
									defaultValue: 'Namahcast',
									type: 'string',
								},
							],
						},
					},
				],
			},
			{
				name: 'Banners',
				path: 'banners',
				version: 1,
				variants: [
					{
						method: 'GET',
						parameters: {
							query: [
								{
									label: 'id',
									defaultValue: '552',
									type: 'string',
								},
							],
						},
					},
				],
			},
			{
				name: 'Search',
				path: 'search',
				version: 1,
				variants: [
					{
						method: 'GET',
						parameters: {
							query: [
								{
									label: 'q',
									defaultValue: 'Namahblogger',
									type: 'string',
								},
							],
						},
					},
				],
			},
			{
				name: 'Concepts',
				path: 'concepts',
				version: 1,
				variants: [
					{
						method: 'GET',
						parameters: {
							query: [
								{
									label: 'limit',
									defaultValue: '3',
									type: 'number',
								},
							],
						},
					},
				],
			},
		],
	},
] as ApiSource[];
