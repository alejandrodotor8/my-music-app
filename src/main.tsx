import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react';
import { AuthProvider } from './Hooks/useAuth';
import { ProtectedRoute } from './shared/ProtectedRoute';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Home from './pages/Home';
import SigIn from './pages/SignIn';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<BrowserRouter>
			<div className="App">
				<AuthProvider>
					<Header />
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
					<Footer />
				</AuthProvider>
			</div>
		</BrowserRouter>
	</StrictMode>
);
