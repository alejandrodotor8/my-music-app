import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../Hooks/reduxHooks';
import { useAuth } from '../../../Hooks/useAuth';
import { IUser } from '../../../shared/types';
import { resetUser } from '../../../store/slices/userSlice';
import { resetFavoritePlaylist } from '../../../store/slices/favoritePlaylistSlice';
import { resetFavorites } from '../../../store/slices/favoritesTracksSlice';
import Button from '../../atoms/Button/Button';
import NavLink from '../../atoms/Nav-link/Nav-link';
import './Menu.scss';

interface Props {
	isOpen: boolean;
	user: IUser;
	setOpen: (isOpen: boolean) => void;
}

export default function Menu({ isOpen, user, setOpen }: Props) {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleClickLogout = (): void => {
		logout();
		dispatch(resetUser());
		dispatch(resetFavoritePlaylist());
		dispatch(resetFavorites());
		navigate('/signin');
	};

	const handleClickNavLink = () => {
		setOpen(!isOpen);
	};

	return (
		<nav className={`menu ${isOpen ? 'menu-open' : ''}`}>
			<NavLink to="/" label="Home" handleClick={handleClickNavLink} />
			<NavLink
				to={'/profile/' + user.id}
				label="Favorites"
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
		</nav>
	);
}
