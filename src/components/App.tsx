import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.scss';

function App() {
	const env = import.meta.env;

	const URL_AUTH = `${env.VITE_AUTH_ENDPOINT}?client_id=${env.VITE_CLIENT_ID}&redirect_uri=${env.VITE_REDIRECT_URI}&response_type=${env.VITE_RESPONSE_TYPE}`;

	const [count, setCount] = useState(0);
	const [token, setToken] = useState('');

	useEffect(() => {
		const hash = location.hash;
		let token: string | null = localStorage.getItem('token_spotify');

		if (!token && hash) {
			token = hash.substring(1).split('&')[0].split('=')[1];
			history.replaceState(null, '', ' ');
			localStorage.setItem('token_spotify', token);
			setToken(token);
		} else if (token) {
			setToken(token);
		}
	}, []);

	const logout = (): void => {
		setToken('');
		localStorage.removeItem('token_spotify');
	};

	return (
		<div className="App">
			<h1>My Music App</h1>
			<div>
				{!token ? (
					<a href={URL_AUTH}>Sign in with spotify</a>
				) : (
					<button onClick={logout}>Log out</button>
				)}
			</div>
		</div>
	);
}

export default App;
