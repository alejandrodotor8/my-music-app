import ButtonFav from '../atoms/Button-fav';
import AudioPlayer from '../atoms/Audio-player';
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';
import { changeFav } from '../../store/slices/playlistSlice';

import type { ITrack } from '../../shared/types';
import './Track.scss';

interface Props {
	track: ITrack;
	index: number;
}

export default function Track({ track, index }: Props) {
	const dispatch = useAppDispatch();
	const handleClick = (track: ITrack) => dispatch(changeFav(track));
	const favPlaylist = useAppSelector((state) => state.playlist.value);

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
