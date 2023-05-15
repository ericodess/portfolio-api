import { Observable } from 'rxjs';

// Interfaces
import { ApiResponseWrapper, Menu } from '@interfaces';

// Types
import { BaseApi } from '@types';

interface DefaultParams {
	_id?: string;
	realm?: string;
	title?: string;
	icon?: string;
	route?: string;
	parentId?: string;
}

type QueryableParams = Omit<DefaultParams, 'route' | 'icon'>;

type CreatableParams = Omit<DefaultParams, '_id'>;

type EditableParams = Omit<DefaultParams, '_id' | 'parentId'>;

export class MenuRegistryApiV1 extends BaseApi {
	private _endpoint = `${this.root}/v1/admin/registry/menu`;

	public search(params?: QueryableParams): Observable<ApiResponseWrapper<Menu[]>> {
		const endpoint = new URL(this._endpoint);

		if (params?._id) {
			endpoint.searchParams.append('id', params._id.trim());
		}

		if (params?.realm) {
			endpoint.searchParams.append('realm', params.realm.trim());
		}

		if (params?.title) {
			endpoint.searchParams.append('title', params.title.trim());
		}

		if (params?.parentId) {
			endpoint.searchParams.append('parentId', params.parentId.trim());
		}

		return this.client.get<ApiResponseWrapper<Menu[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public realms(): Observable<ApiResponseWrapper<string[]>> {
		const endpoint = new URL(this._endpoint + '/realms');

		return this.client.get<ApiResponseWrapper<string[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public searchSelf(): Observable<ApiResponseWrapper<Menu[]>> {
		const endpoint = new URL(this._endpoint + '/self');

		return this.client.get<ApiResponseWrapper<Menu[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public save(params: CreatableParams): Observable<ApiResponseWrapper<Menu>> {
		const endpoint = new URL(this._endpoint);

		return this.client.post<ApiResponseWrapper<Menu>>(
			endpoint.href,
			{
				realm: params.realm,
				title: params.title,
				icon: params.icon,
				route: params.route,
				parentId: params.parentId,
			},
			{
				withCredentials: true,
			},
		);
	}

	public edit(id: string, params: EditableParams): Observable<ApiResponseWrapper<Menu>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.patch<ApiResponseWrapper<Menu>>(
			endpoint.href,
			{
				realm: params.realm,
				title: params.title,
				icon: params.icon,
				route: params.route,
			},
			{
				withCredentials: true,
			},
		);
	}

	public delete(id: string): Observable<ApiResponseWrapper<Menu>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.delete<ApiResponseWrapper<Menu>>(endpoint.href, {
			withCredentials: true,
		});
	}
}
