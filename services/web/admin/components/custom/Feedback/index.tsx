//Styles
import { FeedbackWrapper } from './styles';

const Feedback = ({ text, disabled }: IFeedback) => {
	return (
		<FeedbackWrapper className={disabled ? '--hidden' : '--shaking'}>{text}</FeedbackWrapper>
	);
};

export default Feedback;
