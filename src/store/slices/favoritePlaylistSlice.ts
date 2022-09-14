import { createSlice } from '@reduxjs/toolkit';
import type { IPlaylistFav } from '../../shared/types';

interface favoritesPlaylistState {
	value: IPlaylistFav;
}
const initialState: favoritesPlaylistState = {
	value: {} as IPlaylistFav,
};

export const favoritesPlaylistSlice = createSlice({
	name: '@favoritePlaylist',
	initialState,
	reducers: {
		setFavoritesPlaylist: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { setFavoritesPlaylist } = favoritesPlaylistSlice.actions;
