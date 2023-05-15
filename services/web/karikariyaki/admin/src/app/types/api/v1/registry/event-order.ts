import { Observable } from 'rxjs';

// Interfaces
import { ApiResponseWrapper, EventOrder } from '@interfaces';

// Types
import { BaseApi } from '@types';

interface DefaultParams {
	_id?: string;
	eventId?: string;
	status?: string;
	operatorId?: string;
	clientName?: string;
	itemId?: string;
	variantId?: string;
}

type QueryableParams = DefaultParams;

type CreatableParams = Omit<DefaultParams, '_id'>;

type EditableParams = Pick<DefaultParams, 'status'>;

export class EventOrderRegistryApiV1 extends BaseApi {
	private _endpoint = `${this.root}/v1/admin/registry/event/order`;

	public search(params?: QueryableParams): Observable<ApiResponseWrapper<EventOrder[]>> {
		const endpoint = new URL(this._endpoint);

		if (params?._id) {
			endpoint.searchParams.append('id', params._id.trim());
		}

		if (params?.eventId) {
			endpoint.searchParams.append('eventId', params.eventId.trim());
		}

		if (params?.status) {
			endpoint.searchParams.append('status', params.status.trim());
		}

		if (params?.operatorId) {
			endpoint.searchParams.append('operatorId', params.operatorId.trim());
		}

		if (params?.clientName) {
			endpoint.searchParams.append('clientName', params.clientName.trim());
		}

		if (params?.itemId) {
			endpoint.searchParams.append('itemId', params.itemId.trim());
		}

		if (params?.variantId) {
			endpoint.searchParams.append('variantId', params.variantId.trim());
		}

		return this.client.get<ApiResponseWrapper<EventOrder[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public status(): Observable<ApiResponseWrapper<string[]>> {
		const endpoint = new URL(this._endpoint + '/status');

		return this.client.get<ApiResponseWrapper<string[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public save(params: CreatableParams): Observable<ApiResponseWrapper<EventOrder>> {
		const endpoint = new URL(this._endpoint);

		return this.client.post<ApiResponseWrapper<EventOrder>>(
			endpoint.href,
			{
				eventId: params.eventId,
				status: params.status,
				operatorId: params.operatorId,
				clientName: params.clientName,
				itemId: params.itemId,
				variantId: params.variantId,
			},
			{
				withCredentials: true,
			},
		);
	}

	public edit(id: string, params: EditableParams): Observable<ApiResponseWrapper<EventOrder>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.patch<ApiResponseWrapper<EventOrder>>(
			endpoint.href,
			{
				status: params.status,
			},
			{
				withCredentials: true,
			},
		);
	}

	public delete(id: string): Observable<ApiResponseWrapper<EventOrder>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.delete<ApiResponseWrapper<EventOrder>>(endpoint.href, {
			withCredentials: true,
		});
	}
}
