import { createSlice } from '@reduxjs/toolkit';
import type { IUser } from '../../shared/types';

interface UserState {
	value: IUser;
}
const initialState: UserState = {
	value: { id: '', name: '', image: '' },
};

export const userSlice = createSlice({
	name: '@user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.value = action.payload;
		},
		resetUser: (state) => {
			state.value = initialState.value;
		},
	},
});

export const { setUser, resetUser } = userSlice.actions;
