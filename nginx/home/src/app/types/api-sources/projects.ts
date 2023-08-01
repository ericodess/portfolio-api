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
    responseTimeInMs: -1,
} as ApiSource;
