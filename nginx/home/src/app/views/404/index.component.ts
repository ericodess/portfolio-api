import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-not-found-view',
	templateUrl: './index.component.html',
})
export class NotFoundViewComponent {
	constructor(private _route: ActivatedRoute) {}

	public getRoute() {
		return this._route.snapshot.params['path'].trim();
	}
}
