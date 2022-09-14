import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../Hooks/reduxHooks';
import { resetUser } from '../store/slices/userSlice';

import { useAuth } from '../Hooks/useAuth';
import Track from '../components/molecules/Track';
import Loader from '../components/atoms/Loader';

export default function Profile() {
	const { logout, isAuthenticated } = useAuth();
	const [loading, setLoading] = useState(false);

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
			<main className="profile">
				<section className="profile__content">
					<h2>Welcome back {user.name}</h2>
					<p>This are your favorites global songs</p>

					{favoritesTracks && (
						<ul className="tracks">
							{favoritesTracks.map((track, index) => (
								<Track track={track} index={index + 1} key={track.id} />
							))}
						</ul>
					)}
				</section>
				{isAuthenticated && (
					<button onClick={handleClick} className="profile__logout-btn">
						Log out
					</button>
				)}
			</main>
		);
	}
}
