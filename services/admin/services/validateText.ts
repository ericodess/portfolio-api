const validateText = (text: string): boolean => {
	return text.replace(/\s/g, '').length ? true : false;
};

export default validateText;