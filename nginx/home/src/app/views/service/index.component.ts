import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';

// Types
import { ApiSource, ValidApiSources, ValidApiSourcesV2 } from 'src/app/types';

@Component({
	selector: 'app-endpoint-view',
	templateUrl: './index.component.html',
})
export class ServiceViewComponent implements OnInit {
	public currentApiSource: ApiSource | undefined;

	constructor(private _route: ActivatedRoute, private _router: Router) {}

	ngOnInit(): void {
		this._updateCurrentApiSource();

		this._router.events.subscribe({
			next: (event) => {
				if (event instanceof NavigationEnd === false) {
					return;
				}

				this._updateCurrentApiSource();
			},
		});
	}
	private _updateCurrentApiSource() {
		this.currentApiSource = ValidApiSourcesV2.find(
			(endpoint) =>
				endpoint.rootPath.toUpperCase() ===
				this._route.snapshot.params['rootPath'].toUpperCase(),
		);
	}
}
