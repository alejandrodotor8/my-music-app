import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav-link.scss';

interface Props {
	to: string;
	handleClick: () => void;
	label?: string;
	children?: ReactNode;
}

export default function NavLink_({ to, label, handleClick, children }: Props) {
	let activeClass = 'nav-link nav-link--active';

	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? activeClass : 'nav-link')}
			onClick={handleClick}
		>
			{children}
			{label && <span className="nav-link__label">{label}</span>}
			<div className="nav-link__line"></div>
		</NavLink>
	);
}
