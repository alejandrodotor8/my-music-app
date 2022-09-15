import { createSlice } from '@reduxjs/toolkit';
import type { IPlaylistFav } from '../../shared/types';

interface FavoritesPlaylistState {
	value: IPlaylistFav;
}
const initialState: FavoritesPlaylistState = {
	value: {} as IPlaylistFav,
};

export const favoritesPlaylistSlice = createSlice({
	name: '@favoritePlaylist',
	initialState,
	reducers: {
		setFavoritesPlaylist: (state, action) => {
			state.value = action.payload;
		},
		resetFavoritePlaylist: (state) => {
			state.value = {} as IPlaylistFav;
		},
	},
});

export const { setFavoritesPlaylist, resetFavoritePlaylist } =
	favoritesPlaylistSlice.actions;
