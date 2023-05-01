import { ProductVariant } from '@interfaces';

export interface Product {
	_id: string;
	name: string;
	variants: Array<Omit<ProductVariant, 'product'>>;
}
