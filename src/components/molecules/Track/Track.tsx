import ButtonFav from '../../atoms/Button-fav/Button-fav';
import AudioPlayer from '../../atoms/Audio-player/Audio-player';

import type { ITrack } from '../../../shared/types';
import './Track.scss';

interface Props {
	position: number;
	track: ITrack;
	handleClick: () => void;
	isFav: boolean;
}

export default function Track({ position, track, handleClick, isFav }: Props) {
	return (
		<li className="tracks__item">
			<div className="tracks__item-position">
				<span>{position}</span>
			</div>
			<AudioPlayer image={track.image} audioUrl={track.audio} />
			<div className="tracks__item-info">
				<span className="song">{track.name}</span>
				<span className="artist">{track.artists.join()}</span>
			</div>
			<ButtonFav handleClick={handleClick} isFav={isFav} />
		</li>
	);
}
