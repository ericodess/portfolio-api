import { Observable } from 'rxjs';

// Interfaces
import { ApiResponseWrapper, ProductVariant } from '@interfaces';

// Types
import { BaseApi } from '@types';

interface DefaultParams {
	_id?: string;
	name?: string;
	productId?: string;
}

type QueryableParams = DefaultParams;

type CreatableParams = Omit<DefaultParams, '_id'>;

type EditableParams = Pick<DefaultParams, 'name'>;

export class ProductVariantRegistryApiV1 extends BaseApi {
	private _endpoint = `${this.root}/v1/admin/registry/product/variant`;

	public search(params?: QueryableParams): Observable<ApiResponseWrapper<ProductVariant[]>> {
		const endpoint = new URL(this._endpoint);

		if (params?._id) {
			endpoint.searchParams.append('id', params._id.trim());
		}

		if (params?.name) {
			endpoint.searchParams.append('name', params.name.trim());
		}

		if (params?.productId) {
			endpoint.searchParams.append('productId', params.productId.trim());
		}

		return this.client.get<ApiResponseWrapper<ProductVariant[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public save(params: CreatableParams): Observable<ApiResponseWrapper<ProductVariant>> {
		const endpoint = new URL(this._endpoint);

		return this.client.post<ApiResponseWrapper<ProductVariant>>(
			endpoint.href,
			{
				name: params.name,
				productId: params.productId,
			},
			{
				withCredentials: true,
			},
		);
	}

	public edit(
		id: string,
		params: EditableParams,
	): Observable<ApiResponseWrapper<ProductVariant>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.patch<ApiResponseWrapper<ProductVariant>>(
			endpoint.href,
			{
				name: params.name,
			},
			{
				withCredentials: true,
			},
		);
	}

	public delete(id: string): Observable<ApiResponseWrapper<ProductVariant>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.delete<ApiResponseWrapper<ProductVariant>>(endpoint.href, {
			withCredentials: true,
		});
	}
}
