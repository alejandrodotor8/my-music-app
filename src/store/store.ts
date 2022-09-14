import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';
import { playlistsSlice } from './slices/playlistsSlice';
import { favoritesTracksSlice } from './slices/favoritesTracksSlice';
import { favoritesPlaylistSlice } from './slices/favoritePlaylistSlice';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		favoritesTracks: favoritesTracksSlice.reducer,
		playlists: playlistsSlice.reducer,
		favoritePlaylist: favoritesPlaylistSlice.reducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
