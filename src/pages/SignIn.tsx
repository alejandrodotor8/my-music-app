import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/App.scss';

function SignIn() {
	const env = import.meta.env;
	const URL_AUTH = `${env.VITE_AUTH_ENDPOINT}?client_id=${env.VITE_CLIENT_ID}&redirect_uri=${env.VITE_REDIRECT_URI}&response_type=${env.VITE_RESPONSE_TYPE}`;

	const [token, setToken] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const hash = location.hash;
		let token_LS = localStorage.getItem('token_spotify');

		if (!token_LS && hash) {
			const queryParams = new URLSearchParams(hash.substring(1));
			const access_token = queryParams.get('access_token');

			localStorage.setItem('token_spotify', access_token || '');
			setToken(access_token || '');
		} else if (token_LS) {
			console.log('Hola');
			navigate('/');
		}
	}, [token]);

	return (
		<div className="App">
			<div>
				{!token ? <a href={URL_AUTH}>Sign in with spotify</a> : <p>Hi</p>}
			</div>
		</div>
	);
}

export default SignIn;
