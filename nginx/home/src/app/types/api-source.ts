export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export interface EndpointRequest {
	headers?: Headers;
	body?: any;
	searchParams?: URLSearchParams;
}

export interface EndpointSource {
	name: string;
	path: string;
	version: number;
	method: RequestMethod;
	variants?: Omit<EndpointSource, 'variants'>[];
	requestParams?: EndpointRequest;
}

export interface ApiSource {
	name: string;
	rootUrl: string;
	rootPath: string;
	isSecure: boolean;
	endpoints: EndpointSource[];
}
