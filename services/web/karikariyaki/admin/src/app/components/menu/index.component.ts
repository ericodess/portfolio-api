import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Animations
import { BasicAnimations } from '@animations';

// Types
import { InHouseLang, Menu } from '@interfaces';

// Langs
import Langs from '@langs';

// Services
import { LanguageService } from '@services';

@Component({
	selector: 'app-menu',
	templateUrl: './index.component.html',
	animations: [
		BasicAnimations.verticalShrinkAnimation,
		BasicAnimations.rotateCounterClock180Animation,
	],
})
export class MenuComponent implements OnInit {
	@Input()
	public data: Menu[] = [];
	@Input()
	public depth = 0;

	public expandedNodes: string[] = [];

	public currentLang: InHouseLang = Langs.enUs;

	constructor(private _langService: LanguageService, private _router: Router) {}

	public isNodeExpanded(nodeId: string) {
		return this.expandedNodes.find((expandedNodeId) => expandedNodeId === nodeId)
			? true
			: false;
	}

	ngOnInit(): void {
		this._langService.language.subscribe({
			next: (nextLanguage) => {
				this.currentLang = nextLanguage;
			},
		});
	}

	public onClick(node: Menu) {
		if (!node.children || node.children.length === 0) {
			if (node.route !== null) {
				this._router
					.navigate(['/' + node.route])
					.then((response) => console.log(response))
					.catch((error) => console.log(error));
			}

			return;
		}

		if (this.isNodeExpanded(node._id)) {
			this.expandedNodes = this.expandedNodes.filter(
				(expandedNodeId) => expandedNodeId !== node._id,
			);

			return;
		}

		this.expandedNodes.push(node._id);
	}
}
