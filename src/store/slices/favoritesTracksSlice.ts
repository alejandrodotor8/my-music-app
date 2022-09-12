import { createSlice } from '@reduxjs/toolkit';
import type { ITrack } from '../../shared/types';

interface favoritesTracksState {
	value: ITrack[];
}
const initialState: favoritesTracksState = {
	value: [],
};

export const favoritesTracksSlice = createSlice({
	name: '@favoritesTracks',
	initialState,
	reducers: {
		changeFav: (state, action) => {
			let index = state.value.findIndex(
				(track) => track.id === action.payload.id
			);

			if (index > -1) state.value.splice(index, 1);
			else state.value.push(action.payload);
		},
	},
});

export const { changeFav } = favoritesTracksSlice.actions;
