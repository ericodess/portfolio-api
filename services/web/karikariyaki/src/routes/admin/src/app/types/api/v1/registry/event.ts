import { Observable } from 'rxjs';

// Interfaces
import { ApiResponseWrapper, Event, EventOrder } from '@interfaces';

// Types
import { BaseApi } from '@types';

interface DefaultParams {
	_id?: string;
	name?: string;
	date?: Date;
}

type QueryableParams = Omit<DefaultParams, 'orders'>;

type CreatableParams = Pick<DefaultParams, 'name'>;

type EditableParams = Pick<DefaultParams, 'name'>;

export class EventRegistryApiV1 extends BaseApi {
	private _endpoint = `${this.root}/v1/admin/registry/event`;

	public search(params?: QueryableParams): Observable<ApiResponseWrapper<Event[]>> {
		const endpoint = new URL(this._endpoint);

		if (params?._id) {
			endpoint.searchParams.append('id', params._id.trim());
		}

		if (params?.name) {
			endpoint.searchParams.append('name', params.name.trim());
		}

		if (params?.date) {
			endpoint.searchParams.append('date', params.date.toString());
		}

		return this.client.get<ApiResponseWrapper<Event[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public save(params: CreatableParams): Observable<ApiResponseWrapper<Event>> {
		const endpoint = new URL(this._endpoint);

		return this.client.post<ApiResponseWrapper<Event>>(
			endpoint.href,
			{
				name: params.name,
			},
			{
				withCredentials: true,
			},
		);
	}

	public edit(id: string, params: EditableParams): Observable<ApiResponseWrapper<Event>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.patch<ApiResponseWrapper<Event>>(
			endpoint.href,
			{
				name: params.name,
			},
			{
				withCredentials: true,
			},
		);
	}

	public delete(id: string): Observable<ApiResponseWrapper<Event>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.delete<ApiResponseWrapper<Event>>(endpoint.href, {
			withCredentials: true,
		});
	}
}
