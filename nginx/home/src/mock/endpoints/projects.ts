import { Endpoint } from 'pepefolio';

export default [
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
] as Endpoint[];
