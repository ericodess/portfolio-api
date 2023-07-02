import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StringService {
	public removeLeadingAndTrailingSlashes(value: string) {
		if (!value) {
			return undefined;
		}

		const rasterizedRoute = value.trim().toLowerCase().replace(/^\/+/g, '');

		return rasterizedRoute.replace(/\/+$/, '');
	}
}
