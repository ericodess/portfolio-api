import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Interface
import { Operator } from '@interfaces';

// Animations
import { AvatarAnimations, LoggedNavbarAnimation, LoginNavbarAnimation } from '@animations';

// Service
import { ApiService, OperatorService } from '@services';

@Component({
	selector: 'app-navbar',
	templateUrl: './index.component.html',
	animations: [
		AvatarAnimations.breatheAnimation,
		LoggedNavbarAnimation.swipeAnimation,
		LoginNavbarAnimation.shrinkAnimation,
		LoginNavbarAnimation.swipeAnimation,
	],
})
export class NavbarComponent implements OnInit {
	/**
	 * Primitives
	 */
	public wasLoginInputDispatched = false;
	public wasLoginAvatarDispatched = false;
	public wasLoginNavbarDispatched = false;
	public isLoggedNavbarExpanded = false;
	public isBreathing = true;
	public isLoading = false;

	/**
	 * Angular
	 */
	public loginForm = new FormGroup({
		userName: new FormControl('', Validators.required),
	});

	/**
	 * In House
	 */
	public operator: Operator | null = null;

	constructor(private _apiService: ApiService, private _operatorServidor: OperatorService) {}

	ngOnInit(): void {
		this._operatorServidor.operator.subscribe({
			next: (currentOperator) => {
				this.operator = currentOperator;

				setTimeout(() => {
					this.wasLoginAvatarDispatched = true;
				}, LoginNavbarAnimation.SHRINK_ANIMATION_DURATION_IN_MS + AvatarAnimations.ZOOM_ANIMATION_DURATION_IN_MS + AvatarAnimations.BREATHING_ANIMATION_DURATION_IN_MS);

				setTimeout(() => {
					this.wasLoginNavbarDispatched = true;
				}, AvatarAnimations.ZOOM_ANIMATION_DURATION_IN_MS + LoginNavbarAnimation.SHRINK_ANIMATION_DURATION_IN_MS * 3);
			},
			error: (error) => {
				console.error(error);
			},
		});
	}

	public getLoginAvatarBreatheAnimationStatus = () => {
		return this.isLoading ? (this.isBreathing ? 'inhale' : 'exhale') : 'inhale';
	};

	public getLoginAvatarShrinkAnimationStatus = () => {
		return this.wasLoginAvatarDispatched ? 'min' : 'max';
	};

	public getLoginInputShrinkAnimationStatus = () => {
		return this.wasLoginInputDispatched ? 'min' : 'max';
	};

	public getLoginSwipeAnimation = () => {
		return this.wasLoginAvatarDispatched
			? this.wasLoginInputDispatched
				? 'left'
				: 'right'
			: 'right';
	};

	public getLoggedSwipeAnimation = () => {
		return this.wasLoginInputDispatched && this.wasLoginNavbarDispatched
			? this.isLoggedNavbarExpanded
				? 'left'
				: 'right'
			: 'invalid';
	};

	public onLogin() {
		const userNameFormControl = this.loginForm.get('userName');

		if (
			!userNameFormControl ||
			userNameFormControl.invalid ||
			userNameFormControl.value?.trim().length === 0
		) {
			return;
		}

		const userName = userNameFormControl.value as string;

		this.wasLoginInputDispatched = true;

		const loadingAnimation = setTimeout(() => {
			this.isLoading = true;
			this.isBreathing = false;
		}, LoginNavbarAnimation.SHRINK_ANIMATION_DURATION_IN_MS);

		this._apiService.V1.operatorAdmin.signIn(userName).subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					return;
				}

				clearTimeout(loadingAnimation);

				this.isLoading = false;
				this.isBreathing = true;

				this._operatorServidor.signIn(response.result);
			},
			error: () => {
				clearTimeout(loadingAnimation);

				this.wasLoginInputDispatched = false;
				this.isLoading = false;
				this.isBreathing = true;
			},
		});
	}

	public onHamburgerClick() {
		this.isLoggedNavbarExpanded = !this.isLoggedNavbarExpanded;
	}
}
