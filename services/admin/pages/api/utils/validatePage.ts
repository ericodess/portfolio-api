const getAvailablePages = (): string[] => {
	return ['login', 'dashboard'];
};

const validatePage = (page: string): boolean => {
	const availablePages: string[] = getAvailablePages();

	return availablePages.find((availablePage) => availablePage === page) ? true : false;
};

export default validatePage;
