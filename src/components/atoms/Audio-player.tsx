import { useState, useRef } from 'react';
import './Audio-player.scss';

interface Props {
	audioUrl: string;
	image: string;
}

export default function Audio({ image, audioUrl }: Props) {
	const audio = useRef<HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handleClick = (isPlaying: boolean) => {
		if (audio.current) {
			isPlaying ? audio.current.pause() : audio.current.play();
		}
		setIsPlaying(!isPlaying);
	};
	return (
		<div className="player">
			<img src={image} alt="album image" />
			{audioUrl && (
				<>
					<audio ref={audio} src={audioUrl}></audio>
					<button
						className={`player__play-icon ${
							isPlaying ? 'player__play-icon--pause' : ''
						}`}
						onClick={() => handleClick(isPlaying)}
					></button>
				</>
			)}
		</div>
	);
}
