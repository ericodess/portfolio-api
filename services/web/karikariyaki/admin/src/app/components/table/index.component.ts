import { Component, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Types
import { InHouseLang } from '@interfaces';

// Services
import { LanguageService } from '@services';

@Component({
	selector: 'app-table',
	templateUrl: './index.component.html',
})
export class TableComponent<T> implements OnChanges {
	@Input()
	public data?: T[];
	@Input()
	public onEdit?: (item: T) => void;

	/**
	 * Consts
	 */
	public readonly SETTINGS_HEADER = 'inhouse-settings';

	/**
	 * Table
	 */
	@ViewChild('tableSortRef')
	public tableSortRef = new MatSort();

	public headerList: string[] = [];
	public dataList = new MatTableDataSource<T>([]);

	/**
	 * In House
	 */
	public currentLang: InHouseLang = LanguageService.DEFAULT_LANGUAGE;

	constructor(private _langService: LanguageService) {}

	ngOnInit(): void {
		this._langService.language.subscribe({
			next: (nextLanguage) => {
				this.currentLang = nextLanguage;
			},
		});
	}

	ngAfterViewInit(): void {
		this.dataList.sort = this.tableSortRef;
	}

	ngOnChanges(changes: SimpleChanges): void {
		const nextData = changes['data']?.currentValue;

		if (nextData && nextData.length === 0) {
			this.headerList = [];
			this.dataList.data = [];
		}

		if (nextData && nextData.length > 0) {
			this.headerList = Object.keys(nextData[0]).concat(this.SETTINGS_HEADER);

			this.dataList.data = nextData;
		}
	}

	public isObject(target: string | object) {
		if (!!!target) {
			return;
		}

		return typeof target === 'object';
	}
}
