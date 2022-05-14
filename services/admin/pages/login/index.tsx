import { FormEvent, useState, useEffect, Fragment } from 'react';
import Router from 'next/dist/client/router';

//Types
import { IGeneralResponse } from '../../interfaces/endpoint';
import { ILoginForm } from '../../interfaces/page';

//Components
import Head from 'next/head';
import { Button, Feedback, Form, TextInput } from '../../components';

//Service
import { authenticateLogin, validateEmail } from '../../services';

//Styles
import { LoginPageWrapper } from './styles';

const LoginPage = () => {
	const [isErrorRun, setIsErrorRun] = useState(false),
		[feedbackText, setFeedbackText] = useState('');

	const dashboardURL = '/admin/dashboard';

	useEffect(() => {
		authenticateLogin('dashboard');
	}, []);

	const onSubmitHandler = async (event: FormEvent) => {
		event.preventDefault();

		const loginFormElement: HTMLFormElement = event.target as HTMLFormElement;

		const formData: FormData = new FormData(loginFormElement);

		const formUserNameInput: string = formData.get('loginFormUsername') as string,
			formPaasswordInput: string = formData.get('loginFormPassword') as string;

		if (validateEmail(formUserNameInput)) {
			const formCredentials: ILoginForm = {
				email: formUserNameInput,
				password: formPaasswordInput,
			};

			const myHeaders: Headers = new Headers();

			myHeaders.append('Content-Type', 'application/json');

			await fetch(loginFormElement.action, {
				headers: myHeaders,
				method: loginFormElement.method,
				credentials: 'include',
				body: JSON.stringify(formCredentials),
			})
				.then((response) => response.json())
				.then((data: IGeneralResponse) => {
					if (data.success) {
						setIsErrorRun(false);

						Router.push(dashboardURL);
					} else {
						setIsErrorRun(true);
						setFeedbackText(data.description || 'Please try again');
					}
				})
				.catch(() => {
					setIsErrorRun(true);
					setFeedbackText('Please try again');
				});
		} else {
			setIsErrorRun(true);
			setFeedbackText('Invalid input');
		}
	};

	const onFocusHandler = () => {
		if (isErrorRun) {
			setIsErrorRun(false);
		}
	};

	return (
		<Fragment>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Login</title>
				<meta name="description" content="Login page for the back-end" />
			</Head>
			<main>
				<LoginPageWrapper
					className={`--full-height --full-width --flex-column --flex-centered-items --reactive-background ${
						isErrorRun ? '--error-cycle' : '--color-cycle'
					}`}
				>
					<Form
						title="Admin Page"
						className="--round-borders"
						id="loginForm"
						method="POST"
						action="/admin/service/auth/login"
						onSubmit={onSubmitHandler}
					>
						<TextInput
							type="texta"
							label="E-mail"
							id="loginFormUsername"
							className="--squircle-borders"
							name="loginFormUsername"
							onFocus={onFocusHandler}
						/>
						<TextInput
							type="password"
							label="Password"
							id="loginFormPassword"
							className="--squircle-borders"
							name="loginFormPassword"
							onFocus={onFocusHandler}
						/>
						<Button
							text="Login"
							id="formSubmitButton"
							className="--squircle-borders"
							disabled={isErrorRun}
						/>
						<Feedback text={feedbackText} disabled={!isErrorRun} />
					</Form>
				</LoginPageWrapper>
			</main>
		</Fragment>
	);
};

export default LoginPage;
