import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/Hooks/reduxHooks';
import { addTrack, removeTrack } from '@slices/favoritesTracksSlice';
import { useAuth } from '@/Hooks/useAuth';
import changeFavorite from '@/services/change-favorite';
import type { ITrack } from '@/shared/types';
import './Button-fav.scss';

type Props = {
	track: ITrack;
};

export default function ButtonFav({ track }: Props) {
	const [disabled, setDisabled] = useState(false);
	const { api } = useAuth();
	const dispatch = useAppDispatch();
	const favPlaylistID = useAppSelector(
		(state) => state.favoritePlaylist.value.id
	);
	const favPlaylist = useAppSelector((state) => state.favoritesTracks.value);

	const handleClick = (track: ITrack) => {
		setDisabled(true);
		changeFavorite(
			favPlaylist,
			track,
			favPlaylistID,
			api,
			dispatch,
			addTrack,
			removeTrack
		).then(() => setDisabled(false));
	};
	const isFav = favPlaylist.some((item) => item.id === track.id);

	return (
		<button
			className="button-fav"
			onClick={() => handleClick(track)}
			disabled={disabled}
		>
			<svg xmlns="http://www.w3.org/2000/svg">
				<path
					className={isFav ? 'button-fav--isFav' : ''}
					d="M3.109 1.898c2.376-1.64 5.308-.87 6.891.998 1.584-1.868 4.517-2.63 6.892-.998a4.945 4.945 0 0 1 1.506 1.691c.365.673.57 1.423.599 2.19.117 3.518-2.97 6.337-7.692 10.654l-.099.09a1.788 1.788 0 0 1-2.42.009l-.09-.082C3.973 12.125.878 9.305 1.004 5.787A4.99 4.99 0 0 1 1.6 3.593 4.948 4.948 0 0 1 3.11 1.898Z"
				/>
			</svg>
		</button>
	);
}
