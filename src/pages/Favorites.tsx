import { useAppSelector } from '@/Hooks/reduxHooks';
import MainContent from '../components/templates/Main-content/Main-content';
import Track from '../components/molecules/Track/Track';

export default function Profile() {
	const user = useAppSelector((state) => state.user.value);
	const favoritesTracks = useAppSelector(
		(state) => state.favoritesTracks.value
	);

	return (
		<MainContent
			title={'Welcome back ' + user.name}
			description="This are your favorites global songs"
		>
			{favoritesTracks && (
				<ul className="tracks">
					{favoritesTracks.map((track, index) => (
						<Track key={track.id} position={index + 1} track={track} />
					))}
				</ul>
			)}
		</MainContent>
	);
}
