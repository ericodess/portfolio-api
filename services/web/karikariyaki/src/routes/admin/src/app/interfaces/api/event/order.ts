// Types
import { Operator, Product, ProductVariant } from '@interfaces';

// Enums
import { OrderStatus } from '@enums';

export interface EventOrder {
	_id: string;
	event: Omit<Event, 'orders'>;
	status: OrderStatus;
	operator: Operator;
	client: string;
	item: Omit<Product, 'variants'>;
	variant?: Omit<ProductVariant, 'product'>;
}
