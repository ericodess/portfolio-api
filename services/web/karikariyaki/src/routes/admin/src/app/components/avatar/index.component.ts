import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

// Animation
import { AvatarAnimations } from '@animations';

@Component({
	selector: 'app-avatar',
	templateUrl: './index.component.html',
	animations: [AvatarAnimations.zoomAnimation],
})
export class AvatarComponent implements OnChanges {
	@Input()
	public base64Image?: string;

	public hasChangedImage = true;

	public animationDurationInMs = AvatarAnimations.ZOOM_ANIMATION_DURATION_IN_MS;
	public animationDelayInMs = AvatarAnimations.ZOOM_ANIMATION_DURATION_IN_MS * 1.5;

	ngOnChanges(changes: SimpleChanges): void {
		const nextBase64Image = changes['base64Image'];

		if (nextBase64Image.previousValue?.trim() === nextBase64Image.currentValue?.trim()) {
			return;
		}

		this.hasChangedImage =
			nextBase64Image.previousValue?.trim().length > 0 ||
			nextBase64Image.currentValue?.trim().length === 0;
	}

	public getPropImageShrinkAnimationDelay() {
		return this.hasChangedImage
			? AvatarAnimations.ZOOM_ANIMATION_DURATION_IN_MS
			: AvatarAnimations.ZOOM_ANIMATION_DURATION_IN_MS * 1.5;
	}

	public getDefaultImageShrinkAnimationDelay() {
		return this.hasChangedImage
			? AvatarAnimations.ZOOM_ANIMATION_DURATION_IN_MS * 1.5
			: AvatarAnimations.ZOOM_ANIMATION_DURATION_IN_MS;
	}
}
