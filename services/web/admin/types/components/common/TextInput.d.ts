type TextInputOnFocusHandler = () => void | Promise<void>;

interface ITextInput {
	label: string;
	type: string;
	id?: string;
	className?: string;
	name?: string;
	onFocus: TextInputOnFocusHandler;
}
