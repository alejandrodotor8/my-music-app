import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../Hooks/reduxHooks';
import { useAuth } from '../../../Hooks/useAuth';
import Burger from '../../atoms/Burger/Burger';
import Menu from '../../molecules/Menu/Menu';
import logo from '/vite.svg';
import './Header.scss';

function Header() {
	const [open, setOpen] = useState(false);
	const { isAuthenticated } = useAuth();
	const user = useAppSelector((state) => state.user.value);
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
					<Menu isOpen={open} user={user} setOpen={setOpen} />
				</>
			)}
		</header>
	);
}

export default Header;
