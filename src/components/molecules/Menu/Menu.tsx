import { ReactNode } from 'react';
import './Menu.scss';

interface Props {
	isOpen: boolean;
	children: ReactNode;
}

export default function Menu({ isOpen, children }: Props) {
	return <nav className={`menu ${isOpen ? 'menu-open' : ''}`}>{children}</nav>;
}
