import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../Hooks/reduxHooks';
import { changeFav } from '../store/slices/favoritesTracksSlice';
import MainContent from '../components/templates/Main-content/Main-content';
import Track from '../components/molecules/Track/Track';
import type { ITrack } from '../shared/types';

export default function Profile() {
	const [token] = useState(localStorage.getItem('token'));

	const dispatch = useAppDispatch();

	const user = useAppSelector((state) => state.user.value);
	const favoritesTracks = useAppSelector(
		(state) => state.favoritesTracks.value
	);

	const favPlaylistID = useAppSelector(
		(state) => state.favoritePlaylist.value.id
	);
	const favPlaylist = useAppSelector((state) => state.favoritesTracks.value);

	const handleClickFav = (track: ITrack) => {
		dispatch(changeFav({ track, token, favPlaylistID }));
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
							position={index + 1}
							track={track}
							handleClick={() => handleClickFav(track)}
							isFav={favPlaylist.some((item) => item.id === track.id)}
						/>
					))}
				</ul>
			)}
		</MainContent>
	);
}
