import { EventOrder } from '@interfaces';

export interface Event {
	_id: string;
	name: string;
	date: Date;
	orders: Array<Omit<EventOrder, 'event'>>;
}
