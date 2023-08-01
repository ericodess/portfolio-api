export interface ApiSource {
    name: string;
    description: string;
    rootUrl: string;
    rootPath: string;
    isSecure: boolean;
    responseTimeInMs: number;
}
