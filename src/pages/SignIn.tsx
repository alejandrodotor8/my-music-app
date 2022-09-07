import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import Button from '../components/atoms/Button-primary';
import img from '../assets/img/signinwelcome.png';

function SignIn() {
	const env = import.meta.env;
	const URL_AUTH = `${env.VITE_AUTH_ENDPOINT}?client_id=${env.VITE_CLIENT_ID}&redirect_uri=${env.VITE_REDIRECT_URI}&response_type=${env.VITE_RESPONSE_TYPE}`;

	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const hash = location.hash;
		let token_LS = localStorage.getItem('token_spotify');

		//if token does not exist in LS and there is a hash
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
			<div className="signin__welcome">
				<h2>
					Enjoy top 50
					<span className="signin__welcome--purple"> Spotify </span>global
					songs
				</h2>
				<img src={img} alt="welcome image" />
			</div>
			{!isAuthenticated && (
				<div className="signin__btn">
					<Button type="a" to={URL_AUTH} text="Sign in" />
					<span>with Spotify</span>
				</div>
			)}
		</div>
	);
}

export default SignIn;
