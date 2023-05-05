import { transition, trigger, state, style, animate } from '@angular/animations';

export class AvatarAnimations {
	public static ZOOM_ANIMATION_DURATION_IN_MS = 400;
	public static BREATHING_ANIMATION_DURATION_IN_MS = 1000;

	public static get zoomAnimation() {
		return trigger('zoom', [
			state(
				'open',
				style({
					scale: 0,
					opacity: 0,
				}),
			),
			state(
				'closed',
				style({
					scale: 1,
					opacity: 1,
				}),
			),
			transition(
				'open => closed',
				[
					animate(
						`${AvatarAnimations.ZOOM_ANIMATION_DURATION_IN_MS}ms {{delay}}ms ease-in-out`,
					),
				],
				{ delay: 0 },
			),
			transition(
				'closed => open',
				[
					animate(
						`${AvatarAnimations.ZOOM_ANIMATION_DURATION_IN_MS}ms {{delay}}ms ease-in-out`,
					),
				],
				{ delay: 0 },
			),
		]);
	}

	public static get breatheAnimation() {
		return trigger('breathe', [
			state(
				'inhale',
				style({
					scale: 1,
				}),
			),
			state(
				'exhale',
				style({
					scale: 1.35,
				}),
			),
			transition('inhale => exhale', [
				animate(`${AvatarAnimations.BREATHING_ANIMATION_DURATION_IN_MS}ms ease`),
			]),
			transition('exhale => inhale', [
				animate(`${AvatarAnimations.BREATHING_ANIMATION_DURATION_IN_MS}ms ease`),
			]),
		]);
	}
}
