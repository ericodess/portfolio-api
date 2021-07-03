import styled from "styled-components";

export const FormWrapper = styled.form`
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem 0;
	background-color: white;

	@media (min-width: 801px) {
		gap: 4vh 0;
	}
`;

export const FormTitle = styled.span`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	font-family: "Roboto", serif;
  	font-size: 2.7rem;

	@media (min-width: 801px) {
		font-size: 5.5vh;
	}
`;