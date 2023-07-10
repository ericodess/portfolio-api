import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoint } from 'pepefolio';

// Types
import { ApiSource, ValidApiSources } from 'src/app/types';

// Services
import { StringService } from 'src/app/services';

@Component({
	selector: 'app-endpoint-view',
	templateUrl: './index.component.html',
})
export class ServiceViewComponent implements OnInit {
	public apiSource: ApiSource | undefined;
	public apiSouceEndpoints: Endpoint[] = [];

	public dummyArray = Array<number>(3);

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

				const foundApiSource = ValidApiSources.find(
					(endpoint) => endpoint.rootPath.toUpperCase().trim() === currentPathUpper,
				);

				if (!foundApiSource) {
					this._routeTo404(currentPath);

					return;
				}

				this.apiSource = undefined;
				this.apiSouceEndpoints = [];

				const fetchURL = new URL(
					`${foundApiSource.isSecure ? 'https' : 'http'}://${foundApiSource.rootUrl}/${
						foundApiSource.rootPath
					}/api/specs`,
				);

				fetch(fetchURL.href)
					.then((raw) => raw.json())
					.then((res) => {
						this.apiSource = foundApiSource;
						this.apiSouceEndpoints = res.result as Endpoint[];
					})
					.catch(() => {
						this._routeTo404(currentPath);
					});
			},
		});
	}

	private _routeTo404(path: string) {
		this._router.navigate([this._stringService.removeLeadingAndTrailingSlashes(path)], {
			replaceUrl: true,
		});
	}
}
