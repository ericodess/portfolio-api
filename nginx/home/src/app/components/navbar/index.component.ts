import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';

// Types
import { ApiSource, ValidApiSources, ValidApiSourcesV2 } from 'src/app/types';

@Component({
	selector: 'app-navbar',
	templateUrl: './index.component.html',
})
export class NavbarComponent {
	/**
	 * Consts
	 */
	public readonly NAVBAR_LOGGED_NAVBAR_TRESHOLD = 50;

	/**
	 * Primitives
	 */
	public isNavbarActive = false;

	/**
	 * In House
	 */
	public availableSources = ValidApiSources;
	public currentApiSource: ApiSource | undefined;

	private _touchOrigin: Touch | null = null;

	constructor(private _router: Router) {}

	ngOnInit(): void {
		this._setupScapeMovements();
		this._setupCurrentEndpoint();
	}

	public isServiceActive(rootPath: string) {
		if (!this.currentApiSource) {
			return false;
		}

		return this.currentApiSource.rootPath.toUpperCase() === rootPath.toUpperCase();
	}

	public onHamburguerClick() {
		this.isNavbarActive = !this.isNavbarActive;
	}

	public onLogoTitle() {
		this._router.navigate(['']).then(() => {
			this.onHamburguerClick();
		});
	}

	public onServiceClick(targetService: ApiSource) {
		if (this.isServiceActive(targetService.rootPath)) {
			return;
		}

		this._router.navigate([targetService.rootPath]).then(() => {
			this.onHamburguerClick();
		});
	}

	private _doesHeritageContainClassname(classList: string[], element: HTMLElement): boolean {
		let didFindOnElement = false;

		classList.forEach((className) => {
			if (element.className?.includes && element.className?.includes(className)) {
				didFindOnElement = true;

				return;
			}
		});

		if (didFindOnElement) {
			return true;
		}

		if (!element.parentElement) {
			return false;
		}

		return this._doesHeritageContainClassname(classList, element.parentElement);
	}

	private _setupScapeMovements() {
		window.addEventListener('touchstart', (event) => {
			this._touchOrigin = event.touches[0];
		});

		window.addEventListener('touchend', (event) => {
			if (this.isNavbarActive === false) {
				return;
			}

			const location = event.changedTouches[0];

			if (!location) {
				return;
			}

			const targetComponent = window.document.elementFromPoint(
				location.clientX,
				location.clientY,
			) as HTMLElement;

			if (!targetComponent) {
				return;
			}

			if (this._doesHeritageContainClassname(['navbar'], targetComponent) === false) {
				this.isNavbarActive = false;
			}
		});

		window.addEventListener('touchmove', (event) => {
			if (!this._touchOrigin || this.isNavbarActive === false) {
				return;
			}

			const latestTouch = event.touches[0];

			const xUp = latestTouch.clientX;
			const yUp = latestTouch.clientY;

			const xDiff = this._touchOrigin.clientX - xUp;
			const yDiff = this._touchOrigin.clientY - yUp;

			if (Math.abs(xDiff) < Math.abs(yDiff)) {
				return;
			}

			if (xDiff > this.NAVBAR_LOGGED_NAVBAR_TRESHOLD) {
				this.isNavbarActive = false;

				this._touchOrigin = null;
			}
		});
	}

	private _setupCurrentEndpoint() {
		this._router.events.subscribe({
			next: (event) => {
				const changeEvent = event as RouterEvent;

				if (!changeEvent.url) {
					return;
				}

				const splittedURL = changeEvent.url.split('/');
				const currentPath = splittedURL[splittedURL.length - 1].toUpperCase();

				this.currentApiSource = ValidApiSources.find(
					(endpoint) => endpoint.rootPath.toUpperCase() === currentPath,
				);
			},
		});
	}
}
