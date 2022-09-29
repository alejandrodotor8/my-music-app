import { useNavigate } from 'react-router-dom';
import { resetUser } from '../store/slices/userSlice';
import { resetFavoritePlaylist } from '../store/slices/favoritePlaylistSlice';
import { resetFavorites } from '../store/slices/favoritesTracksSlice';
import { useAppSelector, useAppDispatch } from '../Hooks/reduxHooks';
import { useAuth } from '../Hooks/useAuth';
import Button from '@atoms/Button/Button';
import ProfilePic from '@atoms/Profile-pic/Profile-pic';
import { EBtnElement, EType, ESize } from '@/shared/types';

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
			<ProfilePic image={user.image} size={ESize.BIG}>
				<div className="spin-pp"></div>
			</ProfilePic>
			<h3 className="profile__name">{user.name}</h3>
			<h4 className="profile__id">{'@' + user.id}</h4>

			<Button
				size={ESize.SMALL}
				element={EBtnElement.BUTTON}
				handleClick={handleClickLogout}
				label="Log out"
				type={EType.SECONDARY}
			/>
		</div>
	);
}
