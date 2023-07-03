import { environment } from 'src/environments/environment';

// Types
import { ApiSource } from '../api-source';

const rootUrl = environment.rootUrl;
const isSecure = environment.production;

export default {
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
} as ApiSource;
