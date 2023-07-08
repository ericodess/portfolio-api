import { environment } from 'src/environments/environment';

// Types
import { ApiSource } from '../api-source';

const rootUrl = environment.rootUrl;
const isSecure = environment.production;

export default {
	name: 'Namah',
	description: 'E-commerce / blog mock up',
	rootUrl: rootUrl,
	rootPath: 'namah',
	isSecure: isSecure,
	responseTimeInMs: -1,
	endpoints: [],
} as ApiSource;
