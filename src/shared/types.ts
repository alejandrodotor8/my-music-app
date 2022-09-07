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

export interface User {
	id: string;
	name: string;
	image: string;
}
export interface Track {
	id: string;
	name: string;
	artists: string[];
	image: string;
}
