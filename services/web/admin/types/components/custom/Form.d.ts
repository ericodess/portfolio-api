//Types
import { ReactElement } from 'react';

type FormOnSubmitHandler = (event: FormEvent) => void | Promise<void>;

interface IForm {
	title: string;
	id?: string;
	className?: string;
	method: string;
	action: string;
	onSubmit: FormOnSubmitHandler;
	children: ReactElement[];
}
