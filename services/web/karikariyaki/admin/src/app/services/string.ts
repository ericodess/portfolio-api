export class StringService {
	public static isStringInsideBoundaries(value: string, minSize: number, maxSize: number) {
		if (!value) {
			return false;
		}

		const trimmedValue = value.trim();

		return trimmedValue.length > minSize && trimmedValue.length < maxSize;
	}

	public static removeLeadingAndTrailingSlashes(value: string) {
		if (value === undefined || value === null) {
			return;
		}

		const rasterizedRoute = value.trim().toLowerCase().replace(/^\/+/g, '');

		return rasterizedRoute.replace(/\/+$/, '');
	}

	public static hasValue(value?: string) {
		if (value === undefined || value === null) {
			return false;
		}

		return true;
	}
}
