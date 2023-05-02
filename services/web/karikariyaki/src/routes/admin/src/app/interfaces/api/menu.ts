export interface Menu {
	_id: string;
	title: string;
	route: string;
	parent?: string;
	children: Omit<Menu, 'submenus'>;
}
