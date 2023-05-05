import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

// Interface
import { Operator } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class OperatorService {
	private _operator: Operator | null;
	private _operatorSubject: ReplaySubject<Operator>;
	private _operatorObersavable: Observable<Operator>;

	constructor() {
		this._operator = null;

		this._operatorSubject = new ReplaySubject<Operator>();
		this._operatorObersavable = this._operatorSubject.asObservable();
	}

	public get operator() {
		return this._operatorObersavable;
	}

	public update() {
		if (!this._operator) {
			this.signOut();

			return;
		}

		this._operatorSubject.next(this._operator);
	}

	public signIn(operator: Operator) {
		if (!operator) {
			return;
		}

		if (!this._operatorSubject || this._operatorSubject.closed) {
			this._operatorSubject = new ReplaySubject<Operator>();

			this._operatorObersavable = this._operatorSubject.asObservable();
		}

		this._operator = operator;

		this.update();
	}

	public signOut() {
		console.log('TODO SIGN-OUT');
	}
}
