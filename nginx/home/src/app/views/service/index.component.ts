import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';

// Types
import { ApiSource, ValidApiSourcesV2 } from 'src/app/types';

@Component({
	selector: 'app-endpoint-view',
	templateUrl: './index.component.html',
})
export class ServiceViewComponent implements OnInit {
	public currentApiSource!: ApiSource;

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
		const currentPath = this._route.snapshot.params['rootPath'].toUpperCase().trim();

		const foundApiSource = ValidApiSourcesV2.find(
			(endpoint) => endpoint.rootPath.toUpperCase().trim() === currentPath,
		);

		if (!foundApiSource) {
			this._router.navigate([`404/${currentPath}`]);

			return;
		}

		this.currentApiSource = foundApiSource;
	}
}
