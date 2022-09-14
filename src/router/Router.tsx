import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import PlaylistTracks from '../pages/PlaylistTracks';
import Favorites from '../pages/Profile';
import SigIn from '../pages/SignIn';

export default function Router() {
	return (
		<Routes>
			<Route path="*" element={<h1>404</h1>} />
			<Route path="/signin" element={<SigIn />} />
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/playlist/:playlistId"
				element={
					<ProtectedRoute>
						<PlaylistTracks />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profile/:userId"
				element={() => (
					<ProtectedRoute>
						<Favorites />
					</ProtectedRoute>
				)}
			/>
		</Routes>
	);
}
