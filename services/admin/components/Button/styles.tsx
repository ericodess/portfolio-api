import styled from 'styled-components';

export const ButtonWrapper = styled.button`
	height: 5rem;
	width: 80%;
	margin: 0.5rem 0 0 0;

	background-color: #e7e7e7;
	padding: 0;
	border: none;

	font-family: 'Roboto', serif;
	font-size: 1.2rem;
	color: #333;

	-webkit-transition: background-color ease-in-out 0.2s, color ease-in-out 0.2s;
	-moz-transition: background-color ease-in-out 0.2s, color ease-in-out 0.2s;
	-ms-transition: background-color ease-in-out 0.2s, color ease-in-out 0.2s;
	-o-transition: background-color ease-in-out 0.2s, color ease-in-out 0.2s;
	transition: background-color ease-in-out 0.2s, color ease-in-out 0.2s;

	&:hover,
	&:active,
	&:focus {
		outline: none;
		background-color: #071a52;
		color: white;
	}

	&[disabled='disabled'],
	&:disabled {
		border-color: #808080;
		background-color: #808080;
		color: white;
	}

	@media (min-width: 801px) {
		width: 60%;
		font-size: 2.2vh;
		height: 8vh;
		max-width: 60vh;
		margin: 0;

		&:hover {
			cursor: pointer;
		}

		&[disabled='disabled']:hover,
		&:disabled:hover {
			cursor: default;
		}
	}
`;
