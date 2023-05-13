import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

// Animations
import { BasicAnimations } from '@animations';

// Types
import { Product } from '@interfaces';
import { ProductCreatableParams, ProductEditableParams } from '@types';

// Services
import { ApiService, LanguageService } from '@services';

@Component({
	selector: 'app-registry-product-view',
	templateUrl: './index.component.html',
	animations: [
		BasicAnimations.horizontalShrinkAnimation,
		trigger('fade', [
			transition(':enter', [
				style({ opacity: 0, flex: 0 }),
				animate('0.5s ease-out', style({ opacity: 1, flex: 1 })),
			]),
			transition(':leave', [
				style({ opacity: 1, flex: 1 }),
				animate('0.3s ease-in', style({ opacity: 0, flex: 0 })),
			]),
		]),
	],
})
export class RegistryProductViewComponent implements OnInit {
	/**
	 * Table
	 */
	public dataList: Product[] = [];

	/**
	 * Editor
	 */
	public isEditorOpen = false;

	/**
	 * Registry editor
	 */
	public creatableSubject: ProductCreatableParams | undefined;
	public editableSubject: ProductEditableParams | undefined;

	/**
	 * Language
	 */
	public currentLang = LanguageService.DEFAULT_LANGUAGE;

	constructor(private _apiService: ApiService, private _languageService: LanguageService) {}

	ngOnInit(): void {
		this._apiService.V1.productRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataList = response.result;
			},
		});

		this._languageService.language.subscribe({
			next: (nextLanguage) => {
				this.currentLang = nextLanguage;
			},
		});
	}

	public onCreationInit() {
		this.isEditorOpen = true;

		this.editableSubject = undefined;
		this.creatableSubject = {
			name: '',
		};
	}

	public onEditionInit(item: Product) {
		this.isEditorOpen = true;

		this.creatableSubject = undefined;
		this.editableSubject = {
			name: item.name,
		};
	}
}
