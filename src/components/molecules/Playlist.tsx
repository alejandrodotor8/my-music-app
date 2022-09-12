import { Link } from 'react-router-dom';
import './Playlist.scss';

interface Props {
	id: string;
	name: string;
	image: string;
	followers: number;
}

export default function Playlist({ id, name, image, followers }: Props) {
	const intlFormat = (num: number) => {
		return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
	};

	const friendlyNumber = (num: number) => {
		if (num >= 1000000) return intlFormat(num / 1000000) + 'M';
		else if (num >= 1000) return intlFormat(num / 1000) + 'K';
		else return intlFormat(num);
	};
	return (
		<Link to={'/playlist/' + id} className="playlist__item-link">
			<h4 className="playlist-title">{name}</h4>
			<figure className="playlist-image">
				<img src={image} alt="playlist image" />
			</figure>
			<span className="playlist-followers">
				<svg xmlns="http://www.w3.org/2000/svg">
					<path d="M3.109 1.898c2.376-1.64 5.308-.87 6.891.998 1.584-1.868 4.517-2.63 6.892-.998a4.945 4.945 0 0 1 1.506 1.691c.365.673.57 1.423.599 2.19.117 3.518-2.97 6.337-7.692 10.654l-.099.09a1.788 1.788 0 0 1-2.42.009l-.09-.082C3.973 12.125.878 9.305 1.004 5.787A4.99 4.99 0 0 1 1.6 3.593 4.948 4.948 0 0 1 3.11 1.898Z"></path>
				</svg>
				<span>{friendlyNumber(followers)}</span>
			</span>
		</Link>
	);
}
