import { usePlayer } from '@/Hooks/usePlayer';
import './Button-player.scss';

interface Props {
	audio: string;
}

export default function Audio({ audio }: Props) {
	const { audioUrl, isReproducing, setTrack, element } = usePlayer();

	const handleClick = () => {
		if (element) {
			if (audio !== audioUrl) {
				setTrack(audio);
				element.load();
				element.play();
			} else {
				!isReproducing ? element.play() : element.pause();
			}
		}
	};
	return (
		<button
			className={`play-icon ${
				isReproducing && audio === audioUrl && 'play-icon--pause'
			}`}
			onClick={handleClick}
		></button>
	);
}
