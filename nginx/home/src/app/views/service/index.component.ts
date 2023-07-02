import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

// Types
import { ApiSource, ValidApiSourcesV2 } from 'src/app/types';

// Services
import { StringService } from 'src/app/services';

@Component({
	selector: 'app-endpoint-view',
	templateUrl: './index.component.html',
})
export class ServiceViewComponent implements OnInit {
	public currentApiSource!: ApiSource;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _stringService: StringService,
	) {}

	ngOnInit(): void {
		this._route.url.subscribe({
			next: (url) => {
				const currentPath = url[url.length - 1].path.trim();
				const currentPathUpper = currentPath.toUpperCase().trim();

				const foundApiSource = ValidApiSourcesV2.find(
					(endpoint) => endpoint.rootPath.toUpperCase().trim() === currentPathUpper,
				);

				if (!foundApiSource) {
					this._router.navigate(
						[this._stringService.removeLeadingAndTrailingSlashes(currentPath)],
						{ replaceUrl: true },
					);

					return;
				}

				this.currentApiSource = foundApiSource;
			},
		});
	}
}
