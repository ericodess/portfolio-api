export interface Menu {
	_id: string;
	route: string;
	parent?: string;
	children: Omit<Menu, 'submenus'>;
}
