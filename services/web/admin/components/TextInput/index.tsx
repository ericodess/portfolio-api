//Types
import { ITextInput } from '../../interfaces/component';

//Styles
import { InputWrapper, InputBox, InputLabel } from './styles';

const getAvailableInputTypes = (): string[] => {
	return ['password', 'text'];
};

const isAvailableInputType = (type: string): boolean => {
	const availableInputTypes: string[] = getAvailableInputTypes();

	return availableInputTypes.find((availableType) => availableType === type) ? true : false;
};

const TextInput = ({ label, type, id, className, name, onFocus }: ITextInput) => {
	return (
		<InputWrapper className={className}>
			<InputBox
				id={id}
				name={name}
				type={isAvailableInputType(type) ? type : 'text'}
				onFocus={onFocus}
				autoComplete="off"
				required
			/>
			<InputLabel htmlFor={name}>{label}</InputLabel>
		</InputWrapper>
	);
};

export default TextInput;
