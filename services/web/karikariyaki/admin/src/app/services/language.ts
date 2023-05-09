import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

// Interface
import { InHouseLang } from '@interfaces';

// Languages
import Langs from '@langs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
	private _languageSubject: ReplaySubject<InHouseLang>;
	private _languageObersavable: Observable<InHouseLang>;

	constructor() {
		this._languageSubject = new ReplaySubject<InHouseLang>();
		this._languageObersavable = this._languageSubject.asObservable();
	}

	public get language() {
		return this._languageObersavable;
	}

	public update(nextLanguage: keyof typeof Langs) {
		if (this._languageSubject.closed) {
			return;
		}

		this._languageSubject.next(Langs[nextLanguage]);
	}
}
