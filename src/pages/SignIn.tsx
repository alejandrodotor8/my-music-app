import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { setUser } from '../store/slices/userSlice';
import { SpotifyApi } from '../services/api-spotify';
import { useAppDispatch } from '../Hooks/reduxHooks';
import { EBtnElement } from '@/shared/types';

import Button from '../components/atoms/Button/Button';
import img from '../assets/img/loginimg.png';

function SignIn() {
	const env = import.meta.env;
	const scope = 'playlist-modify-public';
	const URL_AUTH = `${env.VITE_AUTH_ENDPOINT}?client_id=${env.VITE_CLIENT_ID}&redirect_uri=${env.VITE_REDIRECT_URI}&response_type=${env.VITE_RESPONSE_TYPE}&scope=${scope}`;

	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const setUserLogin = (api: SpotifyApi) => {
		api.getCurrentUser().then((res) => {
			dispatch(
				setUser({
					id: res.data.id,
					name: res.data.display_name,
					image: res.data.images[0]?.url,
				})
			);
		});
	};

	useEffect(() => {
		const hash = location.hash;
		let token_LS = localStorage.getItem('token');

		//if token does not exist in LS and there is a hash
		if (!token_LS && hash) {
			const queryParams = new URLSearchParams(hash.substring(1));
			const access_token = queryParams.get('access_token');

			if (access_token) {
				const api = login(access_token);
				setUserLogin(api);
				navigate('/');
			}
			//if token exists in LS
		} else if (token_LS) {
			const api = login(token_LS);
			setUserLogin(api);
			navigate('/');
		}
	}, []);

	return (
		<main className="signin">
			<section className="signin__welcome">
				<h2 className="signin__welcome-title">
					Enjoy top 50
					<span className="signin__welcome.title--purple"> Spotify </span>
					global songs
				</h2>
				<img
					className="signin__welcome-img"
					src={img}
					alt="welcome image"
				/>
			</section>
			{!isAuthenticated && (
				<div className="signin__btn">
					<Button
						element={EBtnElement.LINK}
						to={URL_AUTH}
						label="Sign in"
					/>
					<span>with Spotify</span>
				</div>
			)}
		</main>
	);
}

export default SignIn;
