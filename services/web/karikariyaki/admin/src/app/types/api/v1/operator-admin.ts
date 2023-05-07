import { Observable } from 'rxjs';

// Interfaces
import { ApiResponseWrapper, Operator } from '@interfaces';

// Types
import { BaseApi } from '@types';

export class OperatorAdminApiV1 extends BaseApi {
	private _endpoint = `${this.root}/v1/admin/operator`;

	public signIn(userName: string): Observable<ApiResponseWrapper<Operator>> {
		const endpoint = new URL(`${this._endpoint}/sign-in`);

		return this.client.post<ApiResponseWrapper<Operator>>(
			endpoint.href,
			{
				observe: 'body',
				responseType: 'json',
				userName: userName,
			},
			{
				withCredentials: true,
			},
		);
	}

	public signOut(): Observable<ApiResponseWrapper<null>> {
		const endpoint = new URL(`${this._endpoint}/sign-out`);

		return this.client.get<ApiResponseWrapper<null>>(endpoint.href, {
			withCredentials: true,
		});
	}
}
