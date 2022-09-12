import { useState, useEffect } from 'react';
import { SpotifyApi } from '../services/api-spotify';
import { useAppSelector } from '../Hooks/reduxHooks';
import Playlist from '../components/molecules/Playlist';
import Loader from '../components/atoms/Loader';
import type { IPlaylist } from '../shared/types';

function Home(): JSX.Element {
	const [loading, setLoading] = useState(false);
	const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
	const playlistsState = useAppSelector((state) => state.playlists.value);

	useEffect(() => {
		console.log('Render Home');
		const token = localStorage.getItem('token_spotify');
		if (token && playlistsState.length > 0) {
			try {
				setLoading(true);
				const api = new SpotifyApi(token);

				const promises = playlistsState.map((item) =>
					api.getPlaylist(item)
				);

				Promise.all(promises).then((values) => {
					const _playlists: IPlaylist[] = [];
					values.forEach((value: any) => {
						_playlists.push({
							id: value.data.id,
							name: value.data.name,
							image: value.data.images[0].url,
							followers: value.data.followers.total,
							description: value.data.description,
						});
					});
					setPlaylists(_playlists);
					setLoading(false);
				});
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	if (loading) {
		return <Loader />;
	} else {
		return (
			<main className="home">
				<h2>Best Spotify playlists!</h2>
				<p>choose one and add the best tracks to you favorites playlist</p>
				<section>
					{playlists && (
						<ul className="playlist">
							{playlists.map((item) => (
								<li className="playlist__item" key={item.id}>
									<Playlist
										id={item.id}
										name={item.name}
										image={item.image}
										followers={item.followers}
									/>
								</li>
							))}
						</ul>
					)}
				</section>
			</main>
		);
	}
}

export default Home;
