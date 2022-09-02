import { Navigate, Route, Routes } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth, AuthProvider } from './Hooks/useAuth';
import { Props } from './shared/types';
import './styles/App.scss';
import Home from './pages/Home';
import SigIn from './pages/SignIn';

function ProtectedRoute({ children }: Props): ReactNode {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) {
		return <Navigate to="/signin"></Navigate>;
	}
	return children;
}

function App() {
	return (
		<div className="App">
			<h1>My Music App</h1>
			<AuthProvider>
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route path="/signin" element={<SigIn />} />
					<Route path="*" element={<h1>404</h1>} />
				</Routes>
			</AuthProvider>
		</div>
	);
}

export default App;
