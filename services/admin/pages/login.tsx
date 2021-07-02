import { FormEvent, useState, useEffect, Fragment } from "react";
import Router from "next/dist/client/router";

//Types
import { IGeneralResponse } from "../interfaces/endpoint";
import { ILoginForm } from "../interfaces/page";

//Components
import Head from "next/head";

//Service
import {
    authenticateLogin,
    validateEmail,
    renderFeedback
} from "../services";

const LoginPage = () => {
    const [isErrorRun, setIsErrorRun] = useState(false);

    const dashboardURL: string = "/admin/dashboard";

    useEffect(() => {
		authenticateLogin("dashboard");
	}, []);

    const onSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const loginFormElement: HTMLFormElement = event.target as HTMLFormElement;
        
        const formData: FormData = new FormData(loginFormElement);

        const formUserNameInput: string = formData.get('loginFormUsername') as string,
              formPaasswordInput: string = formData.get('loginFormPassword') as string;

        if(validateEmail(formUserNameInput)){
            const formCredentials: ILoginForm = {
                email: formUserNameInput,
                password: formPaasswordInput
            };

            const myHeaders: Headers = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(loginFormElement.action, {
                headers: myHeaders,
                method: loginFormElement.method,
                credentials: 'include',
                body: JSON.stringify(formCredentials)
            })
            .then(response => response.json())
            .then((data: IGeneralResponse) => {
                if(data.success){
                    setIsErrorRun(false);

                    Router.push(dashboardURL);
                }else{
                    setIsErrorRun(true);

                    renderFeedback(data.description || "Please try again");
                };
            })
            .catch(() => {
                setIsErrorRun(true);

                renderFeedback("Please try again");
            })
        }else{
            setIsErrorRun(true);

            renderFeedback("Invalid input");
        };
    };

    const onFocusHandler = () => {
        const loginFormElement: HTMLFormElement = document.getElementById('loginForm') as HTMLFormElement,
                  loginFormElementLastChild: HTMLElement = loginFormElement.lastElementChild as HTMLElement;

        if(
            loginFormElementLastChild && 
            loginFormElementLastChild.tagName === 'SPAN'
        ){
            loginFormElement.removeChild(loginFormElementLastChild);
        };

        if(isErrorRun){
            setIsErrorRun(false);
        };
    };

    return(
		<Fragment>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<title>Login</title>
				<meta
					name="description"
					content="Login page for the back-end"
				/>
			</Head>
			<main>
				<div className="container --flex-column --flex-centered">
					<form
						id="loginForm"
						className="form"
						method="POST"
						action="/admin/service/auth/login"
						onSubmit={onSubmitHandler}
					>
						<span className="form__title">Admin Page</span>
						<div className="form__group">
							<input
								className="form__input"
								type="text"
								id="loginFormUsername"
								name="loginFormUsername"
								onFocus={onFocusHandler}
							required />
							<label
								className="form__label"
								htmlFor="loginFormUsername"
							>
								Login
							</label>
						</div>
						<div className="form__group">
							<input
								className="form__input"
								type="password"
								id="loginFormPassword"
								name="loginFormPassword"
								onFocus={onFocusHandler}
							required />
							<label
								className="form__label"
								htmlFor="loginFormPassword"
							>
								Password
							</label>
						</div>
						<button
							className="form__submit"
							id="formSubmitButton"
							title="Login"
							disabled={isErrorRun ? true : undefined}
						>
							Login
						</button>
					</form>
				</div>
			</main>
		</Fragment>
	);
};

export default LoginPage;