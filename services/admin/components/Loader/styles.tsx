import styled from 'styled-components';

//Styles
import { ILoaderCircle } from '../../interfaces/component';

export const LoaderWrapper = styled.div`
	width: 100%;
	height: 100%;
	gap: 0.6rem;

	@media (min-width: 801px) {
		gap: 1vh;
	}
`;

export const LoaderCircle = styled.div<ILoaderCircle>`
	border-radius: 50%;
	opacity: 0.6;
	width: 1.2rem;
	height: 1.2rem;

	-webkit-animation: sk-bounce 2s infinite ${(props) => props.delay}s ease-in-out;
	-moz-animation: sk-bounce 2s infinite ${(props) => props.delay}s ease-in-out;
	-o-animation: sk-bounce 2s infinite ${(props) => props.delay}s ease-in-out;
	animation: sk-bounce 2s infinite ${(props) => props.delay}s ease-in-out;

	@media (min-width: 801px) {
		width: 2vh;
		height: 2vh;
	}
`;

LoaderCircle.defaultProps = {
	delay: 0,
};
