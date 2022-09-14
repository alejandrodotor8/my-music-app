import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Home = lazy(() => import('../pages/Home'));
const PlaylistTracks = lazy(() => import('../pages/PlaylistTracks'));
const Favorites = lazy(() => import('../pages/Profile'));
const SigIn = lazy(() => import('../pages/SignIn'));

export default function Router() {
	return (
		<Routes>
			<Route path="*" element={<h1>404</h1>} />
			<Route path="/signin" element={<SigIn />} />
			<Route
				path="/"
				element={
					<Suspense fallback={<>...</>}>
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					</Suspense>
				}
			/>

			<Route
				path="/playlist/:playlistId"
				element={
					<Suspense fallback={<>...</>}>
						<ProtectedRoute>
							<PlaylistTracks />
						</ProtectedRoute>
					</Suspense>
				}
			/>
			<Route
				path="/profile/:userId"
				element={
					<Suspense fallback={<>...</>}>
						<ProtectedRoute>
							<Favorites />
						</ProtectedRoute>
					</Suspense>
				}
			/>
		</Routes>
	);
}
