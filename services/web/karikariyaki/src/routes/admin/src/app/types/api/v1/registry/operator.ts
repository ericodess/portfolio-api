import { Observable } from 'rxjs';

// Interfaces
import { ApiResponseWrapper, Operator } from '@interfaces';

// Types
import { BaseApi } from '@types';

interface DefaultParams {
	_id?: string;
	displayName?: string;
	photo?: string;
}

type QueryableParams = Omit<DefaultParams, 'photo'>;

type CreatableParams = Omit<DefaultParams, '_id'>;

type EditableParams = Omit<DefaultParams, '_id'>;

export class OperatorRegistryApiV1 extends BaseApi {
	private _endpoint = `${this.root}/v1/admin/registry/operator`;

	public search(params?: QueryableParams): Observable<ApiResponseWrapper<Operator[]>> {
		const endpoint = new URL(this._endpoint);

		if (params?._id) {
			endpoint.searchParams.append('id', params._id.trim());
		}

		if (params?.displayName) {
			endpoint.searchParams.append('displayName', params?.displayName.trim());
		}

		return this.client.get<ApiResponseWrapper<Operator[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public save(params: CreatableParams): Observable<ApiResponseWrapper<Operator>> {
		const endpoint = new URL(this._endpoint);

		return this.client.post<ApiResponseWrapper<Operator>>(
			endpoint.href,
			{
				displayName: params.displayName,
				photo: params.photo,
			},
			{
				withCredentials: true,
			},
		);
	}

	public edit(id: string, params: EditableParams): Observable<ApiResponseWrapper<Operator>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.patch<ApiResponseWrapper<Operator>>(
			endpoint.href,
			{
				displayName: params.displayName,
				photo: params.photo,
			},
			{
				withCredentials: true,
			},
		);
	}

	public delete(id: string): Observable<ApiResponseWrapper<Operator>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.delete<ApiResponseWrapper<Operator>>(endpoint.href, {
			withCredentials: true,
		});
	}
}
