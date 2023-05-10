export interface Menu {
	_id: string;
	realm: string;
	title: string;
	icon?: string;
	route: string;
	parent?: string;
	children: Menu[];
}
