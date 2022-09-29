import type { ITrack } from '../shared/types';
import { SpotifyApi } from './api-spotify';

export default async function changeFavorite(
	favPlaylist: ITrack[],
	track: ITrack,
	favPlaylistID: string,
	api: SpotifyApi,
	dispatch: (func: any) => void,
	addTrack: (track: ITrack) => void,
	removeTrack: (index: number) => void
) {
	try {
		let index = favPlaylist.findIndex((elem) => elem.id === track.id);
		if (index > -1) {
			const res = api.removeTrackFavPlaylist(favPlaylistID, track.id);
			dispatch(removeTrack(index));
			return res;
		} else {
			const res = api.addTrackFavPlaylist(favPlaylistID, track.id);
			dispatch(addTrack(track));
			return res;
		}
	} catch (error) {
		console.log(error);
	}
}
