import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import SignIn from '../pages/SignIn';
import Loader from '../components/atoms/Loader/Loader';

const Home = lazy(() => import('../pages/Home'));
const PlaylistTracks = lazy(() => import('../pages/PlaylistTracks'));
const Profile = lazy(() => import('../pages/Profile'));
const Favorites = lazy(() => import('../pages/Favorites'));
const Search = lazy(() => import('../pages/Search'));

export default function Router() {
	return (
		<Routes>
			<Route path="*" element={<h1>404</h1>} />
			<Route path="/signin" element={<SignIn />} />
			<Route
				path="/"
				element={
					<Suspense fallback={<Loader />}>
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					</Suspense>
				}
			/>

			<Route
				path="/playlist/:playlistId"
				element={
					<Suspense fallback={<Loader />}>
						<ProtectedRoute>
							<PlaylistTracks />
						</ProtectedRoute>
					</Suspense>
				}
			/>
			<Route
				path="/profile/:userId"
				element={
					<Suspense fallback={<Loader />}>
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					</Suspense>
				}
			/>
			<Route
				path="/favorites"
				element={
					<Suspense fallback={<Loader />}>
						<ProtectedRoute>
							<Favorites />
						</ProtectedRoute>
					</Suspense>
				}
			/>
			<Route
				path="/search"
				element={
					<Suspense fallback={<Loader />}>
						<ProtectedRoute>
							<Search />
						</ProtectedRoute>
					</Suspense>
				}
			/>
		</Routes>
	);
}
