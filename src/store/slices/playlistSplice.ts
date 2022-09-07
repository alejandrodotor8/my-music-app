import { createSlice } from '@reduxjs/toolkit';
import type { Track } from '../../shared/types';

interface playlistState {
	value: Track[];
}
const initialState: playlistState = {
	value: [],
};

export const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {
		addTrack: (state, action) => {
			if (!state.value.find((track) => track.id === action.payload.id)) {
				state.value.push(action.payload);
			}
		},
		deleteTract: (state, action) => {
			state.value.splice(
				state.value.findIndex((track) => track.id === action.payload.id),
				1
			);
		},
	},
});

export const { addTrack, deleteTract } = playlistSlice.actions;
