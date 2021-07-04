import styled from "styled-components";

export const NavbarWrapper = styled.nav`
	position: absolute;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 15rem;
	z-index: 2;

	-webkit-transition: width ease-in-out .2s;
	-moz-transition: width ease-in-out .2s;
	-ms-transition: width ease-in-out .2s;
	-o-transition: width ease-in-out .2s;
	transition: width ease-in-out .2s;

	& > ul > div button:not(:first-of-type) {
		border-left: .1rem solid #152e7a;
	}

	& > button, & > ul > div > button {
		width: 100%;
		outline: none;
		border: none;
		padding: 0;
		background-color: transparent;
	}

	& svg {
		pointer-events: none;
		margin: 0.7rem 0;
		width: 2rem;
		height: 2rem;
		fill: white;
	}

	&[data-is-nav-hidden="true"] {
		width: 5.5rem;
	}

	&[data-is-nav-hidden="true"] > ul{
		margin: 0 0 0 -10rem;
		box-shadow: none;
	}

	&[data-is-nav-hidden="true"] > button{
		border-radius: .7rem;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	@media (min-width: 801px) {
		width: 24vh;
	}
`;

export const NavbarLogo = styled.div`
	width: 55%;
	margin: 1.25rem auto 0 auto;
	color: white;
	font-family: 'Roboto', serif;
	font-size: 2.5rem;
	background-color: #086972;
    height: 8rem;

	@media (min-width: 801px) {
		margin-top: 2.5vh;
	}
`;

export const NavbarItems = styled.ul`
	display: flex;
	background-color: #071a52;
	width: 100%;
	height: 100%;
	box-shadow: 0 0.4rem 0.5rem 0.15rem rgba(0, 0, 0, 0.2);

	-webkit-transition:
		margin ease-in-out .16s,
		box-shadow ease-in-out .16s;
    -moz-transition:
		margin ease-in-out .16s,
		box-shadow ease-in-out .16s;
    -ms-transition:
		margin ease-in-out .16s,
		box-shadow ease-in-out .16s;
    -o-transition:
		margin ease-in-out .16s,
		box-shadow ease-in-out .16s;
    transition:
		margin ease-in-out .16s,
		box-shadow ease-in-out .16s;

	@media (min-width: 801px) {
		box-shadow: 0 0.8vh 1vh 0.3vh rgba(0, 0, 0, 0.2);
	}
`;

export const NavbarNavigationItems = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
`;

export const NavigationButton = styled.button`
	&:focus, &:active{
		background-color: #0f225c;

		& svg{
			fill: #a7ff83;
		}
	}

	@media (min-width: 801px) {
		-webkit-transition: background-color ease-in-out .16s;
    	-moz-transition: background-color ease-in-out .16s;
    	-ms-transition: background-color ease-in-out .16s;
    	-o-transition: background-color ease-in-out .16s;
    	transition: background-color ease-in-out .16s;

		& svg {
			-webkit-transition: fill ease-in-out .16s;
			-moz-transition: fill ease-in-out .16s;
			-ms-transition: fill ease-in-out .16s;
			-o-transition: fill ease-in-out .16s;
			transition: fill ease-in-out .16s;
		}

		&:hover{
			cursor: pointer;
			background-color: #0f225c;

			& svg{
				fill: #a7ff83;
			}
		}
	}
`;

export const NavbarHambuerguerButton = styled.button`
	background-color: #152e7a !important;
	box-shadow: 0 0.4rem 0.5rem 0.15rem rgba(0, 0, 0, 0.2);
	color: white;

	-webkit-transition: border-radius ease-in-out .2s;
    -moz-transition: border-radius ease-in-out .2s;
    -ms-transition: border-radius ease-in-out .2s;
    -o-transition: border-radius ease-in-out .2s;
    transition: border-radius ease-in-out .2s;

	@media (min-width: 801px) {
		display: none;
	}
`;