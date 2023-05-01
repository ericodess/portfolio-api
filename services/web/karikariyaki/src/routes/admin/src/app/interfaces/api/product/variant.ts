import { Product } from '@interfaces';

export interface ProductVariant {
	_id: string;
	name: string;
	product: Omit<Product, 'variants'>;
}
