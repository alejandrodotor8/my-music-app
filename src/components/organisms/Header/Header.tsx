import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetUser } from '../../../store/slices/userSlice';
import { resetFavoritePlaylist } from '../../../store/slices/favoritePlaylistSlice';
import { resetFavorites } from '../../../store/slices/favoritesTracksSlice';
import { useAppDispatch } from '../../../Hooks/reduxHooks';
import Burger from '../../atoms/Burger/Burger';
import Menu from '../../molecules/Menu/Menu';
import Button from '../../atoms/Button/Button';
import NavLink from '../../atoms/Nav-link/Nav-link';
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
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const body = document.getElementById('body');

	const handleClickBurger = () => {
		if (body) body.classList.toggle('no-scroll');
		setOpen(!open);
	};
	const handleClickLogout = (): void => {
		logout();
		dispatch(resetUser());
		dispatch(resetFavoritePlaylist());
		dispatch(resetFavorites());
		navigate('/signin');
	};

	const handleClickNavLink = () => {
		if (body) {
			const width = body.offsetWidth;
			if (width < 768) {
				body.classList.toggle('no-scroll');
				setOpen(!open);
			}
		}
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
					<Menu isOpen={open}>
						<NavLink
							to="/"
							label="Home"
							handleClick={handleClickNavLink}
						/>
						<NavLink
							to={'/profile/' + user.id}
							label="Favorites"
							handleClick={handleClickNavLink}
						/>
						<NavLink
							to="search"
							label="Search"
							handleClick={handleClickNavLink}
						/>
						<Button
							size="small"
							element="button"
							handleClick={handleClickLogout}
							label="Log out"
							type="secondary"
						/>
						<Link to={'/profile/' + user.id} className="menu__profile">
							<figure>
								<img
									src={user.image}
									alt="Profile picture"
									className="menu__profile-picture"
								/>
							</figure>
						</Link>
					</Menu>
				</>
			)}
		</header>
	);
}

export default Header;
