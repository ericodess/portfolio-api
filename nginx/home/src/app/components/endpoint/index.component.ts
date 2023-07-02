import { Component, Input } from '@angular/core';

// Types
import { EndpointSource } from 'src/app/types';

@Component({
	selector: 'app-endpoint',
	templateUrl: './index.component.html',
})
export class EndpointComponent {
	@Input()
	public rootPath!: string;
	@Input()
	public endpoint!: EndpointSource;
	@Input()
	public parentEndpoint: EndpointSource | undefined;

	public getPath() {
		const rasterizedRootPath = this._removeLeadingAndTrailingSlashes(this.rootPath);
		const rasterizedEndpointPath = this._removeLeadingAndTrailingSlashes(this.endpoint.path);

		if (!this.parentEndpoint) {
			if (rasterizedEndpointPath) {
				return `/${rasterizedRootPath}/${rasterizedEndpointPath}`;
			}

			return `/${rasterizedRootPath}`;
		}

		const rasterizedParentEndpointPath = this._removeLeadingAndTrailingSlashes(
			this.parentEndpoint.path,
		);

		let path = `/${rasterizedRootPath}`;

		if (rasterizedParentEndpointPath) {
			path = path.concat(`/${rasterizedParentEndpointPath}`);
		}

		if (rasterizedEndpointPath) {
			path = path.concat(`/${rasterizedEndpointPath}`);
		}

		return path;
	}

	private _removeLeadingAndTrailingSlashes(value: string) {
		if (!value) {
			return undefined;
		}

		const rasterizedRoute = value.trim().toLowerCase().replace(/^\/+/g, '');

		return rasterizedRoute.replace(/\/+$/, '');
	}
}
