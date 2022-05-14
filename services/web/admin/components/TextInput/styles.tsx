import styled from 'styled-components';

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	border: 0.15rem solid transparent;
	padding: 1rem 0.5rem 0 0.5rem;
	background-color: #e7e7e7;

	-webkit-transition: background-color ease-in-out 0.2s, border-color ease-in-out 0.2s;
	-moz-transition: background-color ease-in-out 0.2s, border-color ease-in-out 0.2s;
	-ms-transition: background-color ease-in-out 0.2s, border-color ease-in-out 0.2s;
	-o-transition: background-color ease-in-out 0.2s, border-color ease-in-out 0.2s;
	transition: background-color ease-in-out 0.2s, border-color ease-in-out 0.2s;

	&:focus-within {
		background-color: transparent;
		border-color: #071a52;
	}

	@media (min-width: 801px) {
		padding: 1.2vh 1vh 0 1.2vh;
		border-width: 0.3vh;
	}
`;

export const InputBox = styled.input`
	width: 100%;
	height: 3.5rem;
	margin: 0 auto 0 auto;

	font-family: 'Roboto Mono', serif;
	font-size: 1.2rem;
	border: none;
	background: transparent;

	&:invalid,
	&:focus {
		box-shadow: none;
		outline: none;
	}

	&:focus + label,
	&:not(:focus):valid + label {
		font-size: 0.8rem;
		margin-top: -0.5rem;
		opacity: 1;
	}

	@media (min-width: 801px) {
		height: 7vh;

		font-size: 2.5vh;

		&:focus + label,
		&:not(:focus):valid + label {
			font-size: 1.6vh;
			margin-top: -0.5vh;
		}
	}
`;

export const InputLabel = styled.label`
	position: absolute;
	margin: 0.8rem 0 0 0;

	pointer-events: none;

	font-family: 'Roboto Mono', serif;
	font-weight: bold;
	font-size: 1rem;
	color: #333;
	opacity: 0.7;

	-webkit-transition: margin ease-in-out 0.1s, font-size ease-in-out 0.1s,
		opacity ease-in-out 0.1s;
	-moz-transition: margin ease-in-out 0.1s, font-size ease-in-out 0.1s, opacity ease-in-out 0.1s;
	-ms-transition: margin ease-in-out 0.1s, font-size ease-in-out 0.1s, opacity ease-in-out 0.1s;
	-o-transition: margin ease-in-out 0.1s, font-size ease-in-out 0.1s, opacity ease-in-out 0.1s;
	transition: margin ease-in-out 0.1s, font-size ease-in-out 0.1s, opacity ease-in-out 0.1s;

	@media (min-width: 801px) {
		font-size: 2vh;
		margin: 2vh 0 0 0;
	}
`;
