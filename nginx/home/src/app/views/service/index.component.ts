import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Types
import { ApiSource, ValidApiSources } from 'src/app/types';

@Component({
	selector: 'app-endpoint-view',
	templateUrl: './index.component.html',
	styleUrls: ['../../../assets/styles/views/_home.scss'],
})
export class ServiceViewComponent implements OnInit {
	private _currentApiSource: ApiSource | undefined;

	constructor(private _route: ActivatedRoute) {}

	ngOnInit(): void {
		this._setCurrentEndpoint();
	}

	private _setCurrentEndpoint() {
		this._currentApiSource = ValidApiSources.find(
			(endpoint) =>
				endpoint.rootPath.toUpperCase() ===
				this._route.snapshot.params['rootPath'].toUpperCase(),
		);

		if (!this._currentApiSource) {
		}
	}
}
