import { createSlice } from '@reduxjs/toolkit';

interface UserState {
	value: string[];
}
const initialState: UserState = {
	value: [
		'37i9dQZEVXbMDoHDwVN2tF',
		'37i9dQZF1DX186v583rmzp',
		'37i9dQZF1DXabkBRQmempy',
		'37i9dQZF1DX0ERdy9Swdy5',
		'0GNUPvpUIAp4MizHXMzxa9',
		'37i9dQZEVXbOa2lmxNORXQ',
		'37i9dQZF1DWUVpAXiEPK8P',
		'37i9dQZF1DX36TRAnIL92N',
		'37i9dQZF1DX3MU5XUozve7',
	],
};

export const playlistsSlice = createSlice({
	name: '@playlists',
	initialState,
	reducers: {
		addPlaylist: (state, action) => {
			state.value.push(action.payload);
		},
	},
});

export const { addPlaylist } = playlistsSlice.actions;
