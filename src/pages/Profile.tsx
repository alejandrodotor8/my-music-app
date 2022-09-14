import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../Hooks/reduxHooks';
import { resetUser } from '../store/slices/userSlice';
import MainContent from '../components/templates/Main-content/Main-content';
import { useAuth } from '../Hooks/useAuth';
import Track from '../components/molecules/Track/Track';
import Loader from '../components/atoms/Loader/Loader';

export default function Profile() {
	const { logout, isAuthenticated } = useAuth();
	const [loading, setLoading] = useState(false);
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
		navigate('/signin');
	};

	if (loading) {
		return <Loader />;
	} else {
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
					<button onClick={handleClick} className="profile__logout-btn">
						Log out
					</button>
				)}
			</MainContent>
		);
	}
}
