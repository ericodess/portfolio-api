//Types
import { IButton } from "../../interfaces/component";

//Styles
import { ButtonWrapper } from "./styles";

const Button = ({
	text,
	id,
	className,
	disabled = undefined
}: IButton) => {
	return(
		<ButtonWrapper
			id={id}
			className={className}
			disabled={disabled}
		>
			{text}
		</ButtonWrapper>
	);
};

export default Button;