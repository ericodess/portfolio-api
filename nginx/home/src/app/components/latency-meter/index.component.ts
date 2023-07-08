import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-latency-meter',
	templateUrl: './index.component.html',
})
export class LatencyMeterComponent {
	private readonly HIGH_MAX_LATENCY_IN_MS = 300;
	private readonly MID_MIN_LATENCY_IN_MS = 100;
	private readonly MID_MAX_LATENCY_IN_MS = 200;

	@Input()
	public latency: number = -1;

	public getLatencyType(): string {
		if (this.latency === -1) {
			return '--dead';
		}

		if (this.latency >= this.HIGH_MAX_LATENCY_IN_MS) {
			return '--high';
		}

		if (
			this.latency >= this.MID_MIN_LATENCY_IN_MS &&
			this.latency <= this.MID_MAX_LATENCY_IN_MS
		) {
			return '--mid';
		}

		return '--normal';
	}
}
