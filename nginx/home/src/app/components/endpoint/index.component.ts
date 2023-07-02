import { Component, Input } from '@angular/core';

// Types
import { EndpointSource } from 'src/app/types';

// Services
import { StringService } from 'src/app/services';

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

	constructor(private _stringService: StringService) {}
	public getPath() {
		const rasterizedRootPath = this._stringService.removeLeadingAndTrailingSlashes(
			this.rootPath,
		);
		const rasterizedEndpointPath = this._stringService.removeLeadingAndTrailingSlashes(
			this.endpoint.path,
		);

		if (!this.parentEndpoint) {
			if (rasterizedEndpointPath) {
				return `/${rasterizedRootPath}/${rasterizedEndpointPath}`;
			}

			return `/${rasterizedRootPath}`;
		}

		const rasterizedParentEndpointPath = this._stringService.removeLeadingAndTrailingSlashes(
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
}
