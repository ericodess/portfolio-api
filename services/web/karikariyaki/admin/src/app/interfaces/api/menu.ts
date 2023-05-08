export interface Menu {
	_id: string;
	realm: string;
	title: string;
	route: string;
	parent?: string;
	children: Omit<Menu, 'submenus'>;
}
