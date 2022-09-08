import { useParams } from 'react-router-dom';
import { useAppSelector } from '../Hooks/reduxHooks';
import Track from '../components/molecules/Track';

export default function Profile() {
	const { id } = useParams();
	const user = useAppSelector((state) => state.user.value);
	const favorites = useAppSelector((state) => state.playlist.value);

	//if (user.id === id) {
	return (
		<div className="profile">
			<h2>Welcome back {user.name}</h2>
			<p>This are your favorites global songs</p>

			{favorites && (
				<ul className="tracks">
					{favorites.map((track, index) => (
						<Track track={track} index={index + 1} key={track.id} />
					))}
				</ul>
			)}
		</div>
	);
	//} else return <div>You do not have permission to see this user profile</div>;
}
