import { useState, useRef } from 'react';
import './Audio-player.scss';

interface Props {
	audioUrl: string;
}

export default function Audio({ audioUrl }: Props) {
	const audio = useRef<HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handleClick = (isPlaying: boolean) => {
		if (audio.current) {
			isPlaying ? audio.current.pause() : audio.current.play();
		}
		setIsPlaying(!isPlaying);
	};
	return (
		<>
			<audio data-testid="player-audio" ref={audio}>
				<source
					data-testid="player-audio-source"
					src={audioUrl}
					type="audio/mpeg"
				/>
			</audio>
			<button
				className={`play-icon ${isPlaying ? 'play-icon--pause' : ''}`}
				onClick={() => handleClick(isPlaying)}
			></button>
		</>
	);
}
