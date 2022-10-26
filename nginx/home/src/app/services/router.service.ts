import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppRouterService {
	constructor(private _router: Router) {}

	public navigateTo(path: string, extras?: NavigationExtras): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this._router
				.navigate([path], extras)
				.then(() => {
					resolve();
				})
				.catch((error) => {
					console.log(error);
					reject();
				});
		});
	}
}
