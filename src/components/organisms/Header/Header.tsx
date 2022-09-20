import { useState } from 'react';
import { Link } from 'react-router-dom';
import Burger from '../../atoms/Burger/Burger';
import Menu from '../../molecules/Menu/Menu';
import logo from '/vite.svg';
import './Header.scss';
import type { IUser } from '../../../shared/types';

interface Props {
	user: IUser;
	isAuthenticated: boolean;
	logout: () => void;
}

function Header({ user, isAuthenticated, logout }: Props) {
	const [open, setOpen] = useState(false);

	const body = document.getElementById('body');

	const handleClickBurger = () => {
		if (body) body.classList.toggle('no-scroll');
		setOpen(!open);
	};
	return (
		<header className="header">
			<Link to="/" className="header__home">
				<img src={logo} alt="logo icon" className="header__home-logo" />
				<h1 className="header__home-title">My music</h1>
			</Link>
			{isAuthenticated && (
				<>
					<Burger handleClickBurger={handleClickBurger} isOpen={open} />
					<Menu
						isOpen={open}
						user={user}
						setOpen={setOpen}
						logout={logout}
					/>
				</>
			)}
		</header>
	);
}

export default Header;
