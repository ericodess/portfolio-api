import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnimationEvent } from '@angular/animations';

// Interface
import { InHouseLang, Menu, Operator } from '@interfaces';

// Animations
import { BasicAnimations, LoggedNavbarAnimation, LoginNavbarAnimation } from '@animations';

// Service
import {
	ApiService,
	LanguageService,
	MenuService,
	OperatorService,
	StringService,
} from '@services';

// Langs
import Langs from '@langs';

@Component({
	selector: 'app-navbar',
	templateUrl: './index.component.html',
	animations: [
		BasicAnimations.breatheAnimation,
		BasicAnimations.bezierShrinkAnimation,
		BasicAnimations.bezierShrinkHeightAnimation,
		BasicAnimations.verticalShrinkAnimation,
		BasicAnimations.rotateCounterClock180Animation,
		LoggedNavbarAnimation.swipeAnimation,
		LoginNavbarAnimation.swipeAnimation,
	],
})
export class NavbarComponent implements OnInit {
	/**
	 * Consts
	 */
	public readonly NAVBAR_INPUT_USER_NAME_MIN_LENGTH = 1;
	public readonly NAVBAR_INPUT_USER_NAME_MAX_LENGTH = 25;

	/**
	 * API switches
	 */
	public isLoading = false;

	/**
	 * Animation switches
	 */
	public wasLoginInputDispatched = false;
	public wasLoginNavbarDispatched = false;
	public isLoggedNavbarExtended = false;

	/**
	 * Animation states
	 */
	public loginAvatarBreatheAnimationState: 'inhale' | 'exhale' = 'inhale';
	public loginAvatarShrinkAnimationState: 'min' | 'max' = 'min';
	public loginInputShrinkAnimationState: 'min' | 'max' = 'min';
	public loginInputErrorShrinkAnimationState: 'min' | 'max' = 'min';
	public loginNavbarSwipeAnimationState: 'right' | 'left' = 'left';
	public loggedNavbarSwipeAnimationState: 'right' | 'left' = 'left';
	public loggedNavbarProfileShrinkAnimationState: 'min' | 'max' = 'min';

	/**
	 * Error
	 */
	public errorMessage = '';

	/**
	 * Angular
	 */
	public loginForm = new FormGroup({
		userName: new FormControl('', [
			Validators.required,
			Validators.minLength(this.NAVBAR_INPUT_USER_NAME_MIN_LENGTH),
			Validators.maxLength(this.NAVBAR_INPUT_USER_NAME_MAX_LENGTH),
		]),
	});

	/**
	 * In House
	 */
	public menu: Menu[] = [];
	public operator: Operator | null = null;
	public currentLang: InHouseLang = Langs.enUs;

	constructor(
		private _apiService: ApiService,
		private _langService: LanguageService,
		private _menuService: MenuService,
		private _operatorService: OperatorService,
	) {}

	ngOnInit(): void {
		this._langService.language.subscribe({
			next: (nextLanguage) => {
				this.currentLang = nextLanguage;
			},
		});

		this._menuService.menu.subscribe({
			next: (nextMenu) => {
				this.menu = nextMenu;
			},
			error: (error) => {
				this.menu = [];

				console.log(error);
			},
		});

		this._operatorService.operator.subscribe({
			next: (nextOperator) => {
				this.disableLoading();

				if (!nextOperator) {
					this.operator = null;

					this.retrieveLogin();

					setTimeout(() => {
						this.retrieveLoginAvatar();
						this.retrieveLoginInput();
					}, LoginNavbarAnimation.LOGIN_SWIPE_ANIMATION_DURATION_IS_MS + LoginNavbarAnimation.LOGIN_SWIPE_ANIMATION_DELAY_IS_MS + 100);

					return;
				}

				this.dispatchLoginInput();

				setTimeout(() => {
					this.operator = nextOperator;
				}, BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS);

				setTimeout(() => {
					this.dispatchLoginAvatar();
				}, BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS * 2);

				setTimeout(() => {
					this.dispatchLogin();
				}, BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS * 2 + 100);

				this._menuService.update();

				return;
			},
			error: () => {
				this.operator = null;

				this.disableLoading();
				this.retrieveLoginInput();
			},
		});
	}

	public retrieveLoginAvatar() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginAvatarShrinkAnimationState = 'max';
	}

	public dispatchLoginAvatar() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginAvatarShrinkAnimationState = 'min';
	}

	public dispatchLoginError() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginInputErrorShrinkAnimationState = 'min';
	}

	public retrieveLoginInput() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginInputShrinkAnimationState = 'max';

		this.loginForm.enable();
	}

	public dispatchLoginInput() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginInputShrinkAnimationState = 'min';

		this.dispatchLoginError();

		this.loginForm.disable();
	}

	public enableLoading() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.isLoading = true;
		this.loginAvatarBreatheAnimationState = 'exhale';
	}

	public disableLoading() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.isLoading = false;
		this.loginAvatarBreatheAnimationState = 'inhale';
	}

	public retrieveLogin() {
		if (this.wasLoginNavbarDispatched === false) {
			return;
		}

		this.loginNavbarSwipeAnimationState = 'right';
	}

	public dispatchLogin() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginNavbarSwipeAnimationState = 'left';
	}

	public onProfileClick() {
		if (this.wasLoginNavbarDispatched === false) {
			return;
		}

		this.loggedNavbarProfileShrinkAnimationState =
			this.loggedNavbarProfileShrinkAnimationState === 'min' ? 'max' : 'min';
	}

	public onFocus() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.setError('');
	}

	public onHamburgerClick() {
		if (this.wasLoginNavbarDispatched === false) {
			return;
		}

		this.loggedNavbarSwipeAnimationState =
			this.loggedNavbarSwipeAnimationState === 'left' ? 'right' : 'left';
	}

	public onLoginAvatarBreatheAnimationDone() {
		if (this.wasLoginNavbarDispatched || this.isLoading === false) {
			return;
		}

		this.loginAvatarBreatheAnimationState =
			this.loginAvatarBreatheAnimationState === 'inhale' ? 'exhale' : 'inhale';
	}

	public onLogin() {
		const userNameFormControl = this.loginForm.get('userName');

		if (
			!userNameFormControl ||
			userNameFormControl.invalid ||
			StringService.isStringInsideBoundaries(
				userNameFormControl.value ?? '',
				this.NAVBAR_INPUT_USER_NAME_MIN_LENGTH,
				this.NAVBAR_INPUT_USER_NAME_MAX_LENGTH,
			) === false
		) {
			return;
		}

		const userName = userNameFormControl.value as string;

		this.dispatchLoginInput();

		const loadingAnimation = setTimeout(() => {
			this.enableLoading();
		}, BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS);

		this._apiService.V1.operatorAdmin.signIn(userName).subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					return;
				}

				clearTimeout(loadingAnimation);

				this._operatorService.signIn(response.result);
			},
			error: (error) => {
				this.setError(error.error.description ?? 'Failed to sign in');

				clearTimeout(loadingAnimation);

				this.disableLoading();

				this.retrieveLoginInput();
			},
		});
	}

	public onLoggedNavbarSwipeAnimationDone(event: AnimationEvent) {
		const rasterizedEventToState = event.toState.trim().toLocaleLowerCase();

		if (rasterizedEventToState === 'invalid') {
			return;
		}

		this.isLoggedNavbarExtended = rasterizedEventToState === 'left';
	}

	public onLoginNavbarSwipeAnimationDone(event: AnimationEvent) {
		const rasterizedEventToState = event.toState.trim().toLocaleLowerCase();

		if (rasterizedEventToState === 'invalid') {
			return;
		}

		this.wasLoginNavbarDispatched = rasterizedEventToState === 'left';
	}

	public onLoginInputShrinkAnimationDone(event: AnimationEvent) {
		if (event.toState.trim().toLocaleLowerCase() !== 'min') {
			return;
		}

		this.wasLoginInputDispatched = true;
	}

	public setError(nextErrorMessage: string) {
		if (nextErrorMessage.trim().length === 0) {
			setTimeout(() => {
				this.errorMessage = '';
			}, BasicAnimations.SHRINK_ANIMATION_DURATION_IN_MS);

			this.loginInputErrorShrinkAnimationState = 'min';

			return;
		}

		this.errorMessage = nextErrorMessage;

		this.loginInputErrorShrinkAnimationState = 'max';
	}
}
