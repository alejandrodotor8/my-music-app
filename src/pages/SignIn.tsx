import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import Button from '../components/atoms/button-primary';
import '../styles/App.scss';

function SignIn() {
	const env = import.meta.env;
	const URL_AUTH = `${env.VITE_AUTH_ENDPOINT}?client_id=${env.VITE_CLIENT_ID}&redirect_uri=${env.VITE_REDIRECT_URI}&response_type=${env.VITE_RESPONSE_TYPE}`;

	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const hash = location.hash;
		let token_LS = localStorage.getItem('token_spotify');

		//if token in LS does not exist and there is a hash
		if (!token_LS && hash) {
			const queryParams = new URLSearchParams(hash.substring(1));
			const access_token = queryParams.get('access_token');

			if (access_token) {
				login(access_token);
				navigate('/');
			}
			//if token exists in LS
		} else if (token_LS) {
			login(token_LS);
			navigate('/');
		}
	}, []);

	return (
		<div className="signin">
			{!isAuthenticated ? (
				<div>
					<Button type="a" to={URL_AUTH}>
						Sign in
					</Button>
					<span>with Spotify</span>
				</div>
			) : null}
		</div>
	);
}

export default SignIn;
