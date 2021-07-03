//Imported Types
import { FormEvent, ReactElement } from "react";

//Private Types
type FormOnSubmitHandler = (event: FormEvent) => void | Promise<void>;

type TextInputOnFocusHandler = () => void | Promise<void>;

//Public Types
export interface IForm {
	title: string
	id?: string
	className?: string
	method: string
	action: string
	onSubmit: FormOnSubmitHandler
	children: ReactElement[]
};

export interface ITextInput {
	label: string
	type: string
	id?: string
	className?: string
	name?: string
	onFocus: TextInputOnFocusHandler
};

export interface IButton {
	text: string
	id?: string
	className?: string
	disabled?: boolean
};

export interface IFeedback {
	text: string
	disabled?: boolean
};