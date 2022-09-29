import { useState, useEffect, useRef } from 'react';
import { usePlayer } from '@/Hooks/usePlayer';
import './Player.scss';

export default function Player() {
	const audio = useRef<HTMLAudioElement>(null);
	const { audioUrl, reproduce, initElement, isReproducing } = usePlayer();
	const [progressBar, setProgressBarr] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		if (audio.current) {
			initElement(audio.current);
			console.log('first');
		}
	}, []);
	const handleLoad = (e: any) => {
		setDuration(e.target.duration);
	};
	const handleProgressBar = (e: any) => {
		if (duration !== 0) {
			setProgressBarr(Math.round((100 * e.target.currentTime) / duration));
		}
	};

	return (
		<>
			{isReproducing && (
				<div className="audio-progress-bar">
					<div
						style={{ width: progressBar + '%' }}
						className="audio-progress-bar__content"
					></div>
				</div>
			)}
			<audio
				ref={audio}
				onPlay={() => reproduce(true)}
				onPause={() => reproduce(false)}
				onTimeUpdate={handleProgressBar}
				onLoadedData={handleLoad}
			>
				<source src={audioUrl} type="audio/mpeg" />
			</audio>
		</>
	);
}
