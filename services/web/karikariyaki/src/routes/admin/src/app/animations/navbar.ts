import { transition, trigger, state, style, animate } from '@angular/animations';

export class LoggedNavbarAnimation {
	public static get swipeAnimation() {
		const isMobile = matchMedia('(max-width: 801px)').matches;

		return isMobile
			? LoggedNavbarAnimation._mobileSwipeAnimation
			: LoggedNavbarAnimation._desktopSwipeAnimation;
	}

	private static _mobileSwipeAnimation = trigger('loggedSwipe', [
		state(
			'left',
			style({
				width: 'calc(100vw + 8vh)',
				transform: 'translateX(-102vw)',
			}),
		),
		state(
			'right',
			style({
				width: 'calc(100vw + 8vh)',
				transform: 'translateX(0)',
			}),
		),
		transition('left => right', [animate('0.2s')]),
		transition('right => left', [animate('0.2s')]),
	]);

	private static _desktopSwipeAnimation = trigger('loggedSwipe', [
		state(
			'left',
			style({
				width: '12.5vh',
			}),
		),
		state(
			'right',
			style({
				width: '35vh',
			}),
		),
		transition('left => right', [animate('0.2s')]),
		transition('right => left', [animate('0.2s')]),
	]);
}

export class LoginNavbarAnimation {
	public static SHRINK_ANIMATION_DURATION_IN_MS = 1000;

	public static get shrinkAnimation() {
		return trigger('shrink', [
			state(
				'min',
				style({
					scale: 0,
					opacity: 0,
				}),
			),
			state(
				'max',
				style({
					scale: 1,
					opacity: 1,
				}),
			),
			transition('min => max', [
				animate(
					`${LoginNavbarAnimation.SHRINK_ANIMATION_DURATION_IN_MS}ms cubic-bezier(0,.05,1,-0.62)`,
				),
			]),
			transition('max => min', [
				animate(
					`${LoginNavbarAnimation.SHRINK_ANIMATION_DURATION_IN_MS}ms cubic-bezier(0,.05,1,-0.62)`,
				),
			]),
		]);
	}

	public static get swipeAnimation() {
		const isMobile = matchMedia('(max-width: 801px)').matches;

		return isMobile
			? LoginNavbarAnimation._mobileSwipeAnimation
			: LoginNavbarAnimation._desktopSwipeAnimation;
	}

	private static _mobileSwipeAnimation = trigger('loginSwipe', [
		state(
			'right',
			style({
				width: 'calc(100vw + 8vh)',
				transform: 'translateX(0)',
			}),
		),
		state(
			'left',
			style({
				width: 'calc(100vw + 8vh)',
				transform: 'translateX(-102vw)',
			}),
		),
		transition('right => left', [animate('0.3s 1s')]),
		transition('left => right', [animate('0.3s 1s')]),
	]);

	private static _desktopSwipeAnimation = trigger('loginSwipe', [
		state(
			'right',
			style({
				width: 'calc(100vw + 12vh)',
			}),
		),
		state(
			'left',
			style({
				width: '12.5vh',
			}),
		),
		transition('right => left', [animate('0.3s 1s')]),
		transition('left => right', [animate('0.3s 1s')]),
	]);
}
