const unfadeElement = (element: HTMLElement) => {
	let opacity = 0.05;

	element.style.display = 'flex';

	const timer = setInterval(() => {
		if (opacity >= 1) {
			clearInterval(timer);
		}

		element.style.opacity = opacity.toString();
		element.style.filter = `alpha(opacity=${opacity * 100})`;
		opacity += opacity * 0.1;
	}, 1);
};

export default unfadeElement;
