import { Component, OnInit } from '@angular/core';
import { Event, EventOrder, Menu, Operator, Product, ProductVariant } from '@interfaces';
import { ApiService } from '@services';

@Component({
	selector: 'app-registry-product-view',
	templateUrl: './index.component.html',
})
export class RegistryProductViewComponent implements OnInit {
	public dataList: Menu[] = [];
	public dataListV: Operator[] = [];
	public dataListG: Event[] = [];
	public dataListGV: EventOrder[] = [];
	public dataListP: Product[] = [];
	public dataListPV: ProductVariant[] = [];

	constructor(private _apiService: ApiService) {}

	ngOnInit(): void {
		this._apiService.V1.menuRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataList = response.result;
			},
		});
		this._apiService.V1.operatorRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataListV = response.result;
			},
		});
		this._apiService.V1.eventRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataListG = response.result;
			},
		});
		this._apiService.V1.productRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataListP = response.result;
			},
		});
		this._apiService.V1.productVariantRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataListPV = response.result;
			},
		});
	}
}
