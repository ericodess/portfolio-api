import styled from "styled-components";

export const LoginPageWrapper = styled.div`
	& form {
		width: 65%;
		min-height: 80vh;

		margin: 0 0 auto 0;
		padding: 2rem 3rem;

		border-top-left-radius: 0;
		border-top-right-radius: 0;

		& > span:first-of-type {
			margin: 2rem 0 6rem 0;
		}

		@media (min-width: 801px) {
			width: 40%;
			min-height: 85vh;
			min-width: 30vh;

			padding: 2vh 7vh 0 7vh;

			& > span:first-of-type {
				margin: 0 0 6vh 0;
			}
		}
	}
`;