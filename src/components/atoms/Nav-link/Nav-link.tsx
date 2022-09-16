import { NavLink } from 'react-router-dom';
import './Nav-link.scss';

interface Props {
	to: string;
	label: string;
	handleClick: () => void;
}

export default function NavLink_({ to, label, handleClick }: Props) {
	let activeClass = 'nav-link nav-link--active';

	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? activeClass : 'nav-link')}
			onClick={handleClick}
		>
			<span className="nav-link__label">{label}</span>
			<div className="nav-link__line"></div>
		</NavLink>
	);
}
