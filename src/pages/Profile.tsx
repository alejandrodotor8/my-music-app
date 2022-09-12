import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../Hooks/reduxHooks';
import { resetUser } from '../store/slices/userSlice';
import { useAuth } from '../Hooks/useAuth';
import Track from '../components/molecules/Track';

export default function Profile() {
	const { logout, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const user = useAppSelector((state) => state.user.value);
	const favorites = useAppSelector((state) => state.favoritesTracks.value);

	const handleClick = (): void => {
		logout();
		dispatch(resetUser());
		navigate('/signin');
	};

	//if (user.id === id) {
	return (
		<main className="profile">
			<section className="profile__content">
				<h2>Welcome back {user.name}</h2>
				<p>This are your favorites global songs</p>

				{favorites && (
					<ul className="tracks">
						{favorites.map((track, index) => (
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
	//} else return <div>You do not have permission to see this user profile</div>;
}
