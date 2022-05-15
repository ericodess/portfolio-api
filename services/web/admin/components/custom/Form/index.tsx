//Styles
import { FormWrapper, FormTitle } from './styles';

const Form = ({ title, className, id, method, action, onSubmit, children }: IForm) => {
	return (
		<FormWrapper
			className={className}
			id={id}
			method={method}
			action={action}
			onSubmit={onSubmit}
		>
			<FormTitle>{title}</FormTitle>
			{children}
		</FormWrapper>
	);
};

export default Form;
