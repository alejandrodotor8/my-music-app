import { createSlice } from '@reduxjs/toolkit';
import { SpotifyApi } from '../../services/api-spotify';
import type { ITrack } from '../../shared/types';

interface FavoritesTracksState {
	value: ITrack[];
}
const initialState: FavoritesTracksState = {
	value: [],
};

export const favoritesTracksSlice = createSlice({
	name: '@favoritesTracks',
	initialState,
	reducers: {
		changeFav: (state, action) => {
			const api = new SpotifyApi(action.payload.token);
			let index = state.value.findIndex(
				(track) => track.id === action.payload.track.id
			);

			if (index > -1) {
				state.value.splice(index, 1);
				api.removeTrackFavPlaylist(
					action.payload.favPlaylistID,
					action.payload.track.id
				);
			} else {
				state.value.push(action.payload.track);
				api.addTrackFavPlaylist(
					action.payload.favPlaylistID,
					action.payload.track.id
				);
			}
		},
		setInitialFavorites: (state, action) => {
			state.value = action.payload;
		},
		resetFavorites: (state) => {
			state.value = [];
		},
	},
});

export const { changeFav, setInitialFavorites, resetFavorites } =
	favoritesTracksSlice.actions;
