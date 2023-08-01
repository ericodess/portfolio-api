import { environment } from 'src/environments/environment';

// Types
import { ApiSource } from '../api-source';

const rootUrl = environment.rootUrl;
const isSecure = environment.production;

export default {
    name: 'Karikariyaki',
    description: 'Fast food management system',
    rootUrl: rootUrl,
    rootPath: 'karikariyaki',
    isSecure: isSecure,
    responseTimeInMs: -1,
} as ApiSource;
