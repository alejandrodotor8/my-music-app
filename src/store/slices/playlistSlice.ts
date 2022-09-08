import { createSlice } from '@reduxjs/toolkit';
import type { ITrack } from '../../shared/types';

interface playlistState {
	value: ITrack[];
}
const initialState: playlistState = {
	value: [],
};

export const playlistSlice = createSlice({
	name: 'playlist',
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

export const { changeFav } = playlistSlice.actions;
