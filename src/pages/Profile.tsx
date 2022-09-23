import { useNavigate } from 'react-router-dom';
import { resetUser } from '../store/slices/userSlice';
import { resetFavoritePlaylist } from '../store/slices/favoritePlaylistSlice';
import { resetFavorites } from '../store/slices/favoritesTracksSlice';
import { useAppSelector, useAppDispatch } from '../Hooks/reduxHooks';
import { useAuth } from '../Hooks/useAuth';
import Button from '../components/atoms/Button/Button';

export default function Profile() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { logout } = useAuth();
	const user = useAppSelector((state) => state.user.value);

	const handleClickLogout = (): void => {
		logout();
		dispatch(resetUser());
		dispatch(resetFavoritePlaylist());
		dispatch(resetFavorites());
		navigate('/signin');
	};

	return (
		<div className="profile">
			<figure className="profile__picture">
				<img src={user.image} alt="Profile picture" />
				<div className="spin"></div>
			</figure>
			<h3 className="profile__name">{user.name}</h3>
			<h4 className="profile__id">{'@' + user.id}</h4>

			<Button
				size="small"
				element="button"
				handleClick={handleClickLogout}
				label="Log out"
				type="secondary"
			/>
		</div>
	);
}
