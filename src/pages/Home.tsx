import { useState, useEffect } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { SpotifyApi } from '../services/api-spotify';
import { useAppDispatch, useAppSelector } from '../Hooks/reduxHooks';
import { setUser } from '../store/slices/userSlice';
import Loader from '../components/atoms/Loader';
import FavButton from '../components/atoms/Button-fav';
import type { Track } from '../shared/types';

function Home(): JSX.Element {
	const [token] = useState(localStorage.getItem('token_spotify'));
	const { login } = useAuth();

	const [playlist, setPlaylist] = useState<Track[]>();
	const [loading, setLoading] = useState(false);

	const user = useAppSelector((state) => state.user.value);
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log('Render Home');

		if (token) {
			login(token);
			try {
				setLoading(true);
				const api = new SpotifyApi(token);
				api.getCurrentUser().then((res) => {
					dispatch(
						setUser({
							id: res.data.id,
							name: res.data.display_name,
							image: res.data.images[0].url,
						})
					);
				});
				api.getPlaylistTracks('37i9dQZEVXbMDoHDwVN2tF').then((res) => {
					console.log(res.data.items);
					const tracks: Track[] = [];
					res.data.items.forEach((item: any) => {
						tracks.push({
							id: item.track.id,
							name: item.track.name,
							artists: item.track.artists.map((item: any) => item.name),
							image: item.track.album.images[0].url,
						});
					});

					setPlaylist(tracks);
					setTimeout(() => {
						setLoading(false);
					}, 500);
				});
			} catch (error) {
				console.log(error);
			}
		}
	}, [token]);

	if (loading) {
		return <Loader />;
	} else if (user.id && !loading) {
		return (
			<div className="home">
				<h2>Welcome Back {user.name}</h2>
				<p>Add the best tracks to you favorites playlist</p>
				{playlist && (
					<ul className="tracks">
						{playlist.map((track) => (
							<li className="tracks__item" key={track.id}>
								<img src={track.image} alt="album image" />
								<div className="tracks__item-info">
									<span className="song">{track.name}</span>
									<span className="artist">
										{track.artists.join()}
									</span>
								</div>
								<FavButton />
							</li>
						))}
					</ul>
				)}
			</div>
		);
	}

	return <></>;
}

export default Home;
