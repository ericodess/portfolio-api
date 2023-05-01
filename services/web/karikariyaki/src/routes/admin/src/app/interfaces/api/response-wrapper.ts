export interface ApiResponseWrapper<T> {
	wasSuccessful: boolean;
	result?: T;
}
