import { createSlice } from '@reduxjs/toolkit';
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
		removeTrack: (state, action) => {
			state.value.splice(action.payload, 1);
		},
		addTrack: (state, action) => {
			state.value.unshift(action.payload);
		},
		setInitialFavorites: (state, action) => {
			state.value = action.payload;
		},
		resetFavorites: (state) => {
			state.value = [];
		},
	},
});

export const { removeTrack, addTrack, setInitialFavorites, resetFavorites } =
	favoritesTracksSlice.actions;
