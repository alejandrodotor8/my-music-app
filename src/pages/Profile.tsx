import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../Hooks/reduxHooks';
import { resetUser } from '../store/slices/userSlice';
import { resetFavoritePlaylist } from '../store/slices/favoritePlaylistSlice';
import { resetFavorites } from '../store/slices/favoritesTracksSlice';
import { useAuth } from '../Hooks/useAuth';
import MainContent from '../components/templates/Main-content/Main-content';
import Track from '../components/molecules/Track/Track';
import Button from '../components/atoms/Button/Button';

export default function Profile() {
	const { logout, isAuthenticated } = useAuth();
	const [token] = useState(localStorage.getItem('token'));

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const user = useAppSelector((state) => state.user.value);
	const favoritesTracks = useAppSelector(
		(state) => state.favoritesTracks.value
	);

	const handleClick = (): void => {
		logout();
		dispatch(resetUser());
		dispatch(resetFavoritePlaylist());
		dispatch(resetFavorites());
		navigate('/signin');
	};

	return (
		<MainContent
			title={'Welcome back ' + user.name}
			description="This are your favorites global songs"
		>
			{favoritesTracks && token && (
				<ul className="tracks">
					{favoritesTracks.map((track, index) => (
						<Track
							key={track.id}
							index={index + 1}
							track={track}
							token={token}
						/>
					))}
				</ul>
			)}
			{isAuthenticated && (
				<Button
					element="button"
					handleClick={handleClick}
					label="Log out"
					type="secondary"
				/>
			)}
		</MainContent>
	);
}
