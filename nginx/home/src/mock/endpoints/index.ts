import { Endpoint } from 'pepefolio';

import Karikariyaki from './karikariyaki';
import Namah from './namah';
import Projects from './projects';

interface MockEndpoint {
    [key: string]: Endpoint[];
}

export default {
    karikariyaki: Karikariyaki,
    namah: Namah,
    projects: Projects,
} as MockEndpoint;
