import { Component, OnInit } from '@angular/core';

// Types
import { ProductVariant } from '@interfaces';

// Services
import { ApiService } from '@services';

@Component({
	selector: 'app-registry-product-variant-view',
	templateUrl: './index.component.html',
})
export class RegistryProductVariantViewComponent implements OnInit {
	public dataList: ProductVariant[] = [];

	constructor(private _apiService: ApiService) {}

	ngOnInit(): void {
		this._apiService.V1.productVariantRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataList = response.result;
			},
		});
	}
}
