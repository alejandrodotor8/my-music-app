import type { ITrack } from '../shared/types';
import { SpotifyApi } from '../services/api-spotify';

export default function changeFavorite(
	favPlaylist: ITrack[],
	track: ITrack,
	favPlaylistID: string,
	api: SpotifyApi,
	dispatch: (func: any) => void,
	addTrack: (track: ITrack) => void,
	removeTrack: (index: number) => void
): void {
	let index = favPlaylist.findIndex((elem) => elem.id === track.id);
	if (index > -1) {
		api.removeTrackFavPlaylist(favPlaylistID, track.id)
			.then(() => dispatch(removeTrack(index)))
			.catch((err) => console.log(err));
	} else {
		api.addTrackFavPlaylist(favPlaylistID, track.id)
			.then(() => dispatch(addTrack(track)))
			.catch((err) => console.log(err));
	}
}
