export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

interface Parameter {
	label: string;
	defaultValue: string;
	type: string;
}

export interface EndpointParameters {
	search?: Parameter[];
	query?: Parameter[];
	body?: Parameter[];
}

export interface Endpoint {
	name: string;
	path: string;
	version: number;
	method: RequestMethod;
	variants?: VariantEndpoint[];
	parameters?: EndpointParameters;
	credentials?: RequestCredentials;
}

export type VariantEndpoint = Omit<Endpoint, 'version' | 'variants'>;

export interface ApiSource {
	name: string;
	description: string;
	rootUrl: string;
	rootPath: string;
	isSecure: boolean;
	endpoints: Endpoint[];
}
