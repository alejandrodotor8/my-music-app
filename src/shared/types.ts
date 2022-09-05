import { ReactNode } from 'react';

export interface Props {
	children?: ReactNode;
}

type Btn = 'a' | 'b';
export interface IButton {
	text: string;
	to: string;
	type: Btn;
}
