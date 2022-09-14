import ButtonFav from '../atoms/Button-fav';
import AudioPlayer from '../atoms/Audio-player';
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';
import { changeFav } from '../../store/slices/favoritesTracksSlice';

import type { ITrack } from '../../shared/types';
import './Track.scss';

interface Props {
	track: ITrack;
	index: number;
	token: string;
}

export default function Track({ track, index, token }: Props) {
	const dispatch = useAppDispatch();
	const favPlaylist = useAppSelector((state) => state.favoritesTracks.value);
	const favPlaylistID = useAppSelector(
		(state) => state.favoritePlaylist.value.id
	);

	const handleClick = (track: ITrack) => {
		dispatch(changeFav({ track, token, favPlaylistID }));
	};

	return (
		<li className="tracks__item">
			<div className="tracks__item-position">
				<span>{index}</span>
			</div>
			<AudioPlayer image={track.image} audioUrl={track.audio} />
			<div className="tracks__item-info">
				<span className="song">{track.name}</span>
				<span className="artist">{track.artists.join()}</span>
			</div>
			<ButtonFav
				handleClick={() => handleClick(track)}
				isFav={favPlaylist.some((item) => item.id === track.id)}
			/>
		</li>
	);
}
