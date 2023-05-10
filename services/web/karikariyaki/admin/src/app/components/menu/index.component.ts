import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Animations
import { BasicAnimations } from '@animations';

// Types
import { InHouseLang, Menu } from '@interfaces';

// Langs
import Langs from '@langs';

// Services
import { LanguageService, StringService } from '@services';

@Component({
	selector: 'app-menu',
	templateUrl: './index.component.html',
	animations: [
		BasicAnimations.fadeAnimation,
		BasicAnimations.rotateCounterClock180Animation,
		BasicAnimations.verticalShrinkAnimation,
	],
})
export class MenuComponent implements OnInit {
	@Input()
	public data: Menu[] = [];
	@Input()
	public depth = 0;
	@Input()
	public callback: (() => void) | undefined;

	public currentLang: InHouseLang = Langs.enUs;

	private _activeRoute = '-';
	private _activeNodes: Set<string> = new Set();

	constructor(private _langService: LanguageService, private _router: Router) {}

	ngOnInit(): void {
		this._langService.language.subscribe({
			next: (nextLanguage) => {
				this.currentLang = nextLanguage;
			},
		});
	}

	public isActive(node: Menu) {
		const windowRoute = StringService.removeLeadingAndTrailingSlashes(this._router.url);

		if (node.route === windowRoute && this._activeRoute !== windowRoute) {
			this._updateMenuActiveItem(node.route);

			this._activeRoute = windowRoute;
		}

		return this._activeNodes.has(node._id) ? true : false;
	}

	public isExpandable(node: Menu) {
		return !!node.children && node.children.length > 0;
	}

	public onClick(node: Menu) {
		if (!node.children || node.children.length === 0) {
			if (node.route !== null) {
				this._router
					.navigate(['/' + node.route])
					.then((response) => {
						if (!response) {
							return;
						}

						this._updateMenuActiveItem(node.route);

						if (this.callback) {
							this.callback();
						}
					})
					.catch(() => {
						this._activeRoute = '-';

						this._router.navigate(['/']);
					});
			}

			return;
		}

		if (this.isActive(node)) {
			this._activeNodes.delete(node._id);

			return;
		}

		this._activeNodes.add(node._id);
	}

	private _updateMenuActiveItem(
		targetRoute: string,
		tree: Menu[] = this.data,
		result: string[] = [],
		depth = 1,
	) {
		for (let i = 0; i < tree.length; i++) {
			const node = tree[i];

			result.push(node._id);

			if (node.route === targetRoute) {
				this._activeNodes.clear();

				result.forEach((nodeId) => {
					this._activeNodes.add(nodeId);
				});

				break;
			}

			if (!node.children || node.children.length === 0) {
				result = result.slice(0, -depth);

				depth = 1;

				continue;
			}

			depth++;

			this._updateMenuActiveItem(targetRoute, node.children, result, depth);
		}
	}
}
