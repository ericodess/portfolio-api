import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnimationEvent } from '@angular/animations';

// Interface
import { Operator } from '@interfaces';

// Animations
import { BasicAnimations, LoggedNavbarAnimation, LoginNavbarAnimation } from '@animations';

// Service
import { ApiService, OperatorService, StringService } from '@services';

@Component({
	selector: 'app-navbar',
	templateUrl: './index.component.html',
	animations: [
		BasicAnimations.breatheAnimation,
		LoggedNavbarAnimation.swipeAnimation,
		LoginNavbarAnimation.shrinkAnimation,
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

	/**
	 * Animation states
	 */
	public loginAvatarBreatheAnimationState: 'inhale' | 'exhale' = 'inhale';
	public loginAvatarShrinkAnimationState: 'min' | 'max' = 'max';
	public loginInputShrinkAnimationState: 'min' | 'max' = 'max';
	public loginInputErrorShrinkAnimationState: 'min' | 'max' = 'min';
	public loginNavbarSwipeAnimationState: 'right' | 'left' = 'right';
	public loggedNavbarSwipeAnimationState: 'right' | 'left' = 'left';

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
	public operator: Operator | null = null;

	constructor(private _apiService: ApiService, private _operatorService: OperatorService) {}

	ngOnInit(): void {
		this._operatorService.operator.subscribe({
			next: (currentOperator) => {
				this.operator = currentOperator;

				if (!currentOperator) {
					this.retrieveLoginInput();

					return;
				}

				this.dispatchLoginInput();

				setTimeout(() => {
					this.dispatchLoginAvatar();
					this.dispatchLogin();
				}, LoginNavbarAnimation.SHRINK_ANIMATION_DURATION_IN_MS + BasicAnimations.ZOOM_ANIMATION_DURATION_IN_MS);

				return;
			},
			error: () => {
				this.setError('Failed to retrieve operator data');

				this.retrieveLoginInput();
				this.disableLoading();
			},
		});
	}

	public dispatchLoginAvatar() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginAvatarShrinkAnimationState = 'min';
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

	public dispatchLogin() {
		if (this.wasLoginNavbarDispatched) {
			return;
		}

		this.loginNavbarSwipeAnimationState = 'left';
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
		}, LoginNavbarAnimation.SHRINK_ANIMATION_DURATION_IN_MS);

		this._apiService.V1.operatorAdmin.signIn(userName).subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					return;
				}

				clearTimeout(loadingAnimation);

				this.disableLoading();

				this._operatorService.signIn(response.result);
			},
			error: () => {
				this.setError('Failed to sign in');

				clearTimeout(loadingAnimation);

				this.disableLoading();

				this.retrieveLoginInput();
			},
		});
	}

	public onLoginNavbarSwipeAnimationDone(event: AnimationEvent) {
		if (event.toState.trim().toLocaleLowerCase() !== 'left') {
			return;
		}

		this.wasLoginNavbarDispatched = true;
	}

	public onLoginInputShrinkAnimationDone(event: AnimationEvent) {
		if (event.toState.trim().toLocaleLowerCase() !== 'min') {
			return;
		}

		this.wasLoginInputDispatched = true;
	}

	public setError(nextErrorMessage: string) {
		if (nextErrorMessage.trim().length === 0) {
			this.errorMessage = '';

			this.loginInputErrorShrinkAnimationState = 'min';

			return;
		}

		this.errorMessage = nextErrorMessage;

		this.loginInputErrorShrinkAnimationState = 'max';
	}
}
