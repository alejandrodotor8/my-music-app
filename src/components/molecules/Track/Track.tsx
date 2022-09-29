import ButtonFav from '@atoms/Button-fav/Button-fav';
import AudioPlayer from '@/components/atoms/Button-player/Button-player';
import type { ITrack } from '@/shared/types';
import './Track.scss';

interface Props {
	position: number;
	track: ITrack;
}

export default function Track({ position, track }: Props) {
	return (
		<li className="tracks__item">
			<div className="tracks__item-position">
				<span>{position}</span>
			</div>
			<figure className="tracks__item-album-cover">
				<img src={track.image} alt="album cover" />
				{track.audio && <AudioPlayer audio={track.audio} />}
			</figure>
			<div className="tracks__item-info">
				<span className="song">{track.name}</span>
				<span className="artist">{track.artists.join()}</span>
			</div>
			<ButtonFav track={track} />
		</li>
	);
}
