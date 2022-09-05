import { useState, useEffect } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { SpotifyApi } from '../services/api-spotify';
import { User, Track } from '../shared/types';
function Home() {
	const [token, setToken] = useState(localStorage.getItem('token_spotify'));
	const { login } = useAuth();

	const [user, setUser] = useState<User>();
	const [playlist, setPlaylist] = useState<Track[]>();

	useEffect(() => {
		if (token) {
			login(token);
			try {
				const api = new SpotifyApi(token);
				api.getCurrentUser().then((res) =>
					setUser({
						id: res.data.id,
						name: res.data.display_name,
						image: res.data.images[0].url,
					})
				);
				api.getPlaylistTracks('37i9dQZEVXbMDoHDwVN2tF').then((res) => {
					console.log(res);
					const tracks: Track[] = [];
					res.data.items.forEach((item: any) =>
						tracks.push({
							id: item.track.id,
							name: item.track.name,
							artists: item.track.artists.map((item: any) => item.name),
						})
					);
					setPlaylist(tracks);
				});
			} catch (error) {
				console.log(error);
			}
		}
	}, [token]);

	return (
		<div className="home">
			{user && (
				<div>
					<p>Welcome Back {user.name}</p>
					<img src={user.image} alt="" width="45" />
					{playlist && (
						<ul>
							{playlist.map((track) => (
								<li key={track.id}>{track.name}</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
}

export default Home;
