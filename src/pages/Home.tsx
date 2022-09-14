import { useState, useEffect } from 'react';
import { SpotifyApi } from '../services/api-spotify';
import { useAppSelector, useAppDispatch } from '../Hooks/reduxHooks';
import { setFavoritesPlaylist } from '../store/slices/favoritePlaylistSlice';
import { setInitialFavorites } from '../store/slices/favoritesTracksSlice';
import Playlist from '../components/molecules/Playlist';
import Loader from '../components/atoms/Loader';
import type { IPlaylist, IPlaylistFav, ITrack } from '../shared/types';

export default function Home(): JSX.Element {
	const [loading, setLoading] = useState(false);
	const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
	const playlistsState = useAppSelector((state) => state.playlists.value);

	const user = useAppSelector((state) => state.user.value);

	const dispatch = useAppDispatch();

	//Trae las playlist iniciales
	useEffect(() => {
		console.log('Render Home');
		const token = localStorage.getItem('token');
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
							image: value.data.images[0]?.url,
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

	//Trae la playlist de favoritos
	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token && user.id) {
			try {
				const api = new SpotifyApi(token);
				api.getFavoritesPlaylist(user.id, 50).then((res: IPlaylistFav) => {
					dispatch(setFavoritesPlaylist(res));
					if (res.id) {
						api.getPlaylistTracks(res.id).then((res) => {
							const tracks: ITrack[] = [];
							res.data.items.forEach((item: any) => {
								tracks.push({
									id: item.track.id,
									name: item.track.name,
									artists: item.track.artists.map(
										(item: any) => item.name
									),
									image: item.track.album.images[0]?.url,
									audio: item.track.preview_url,
								});
							});
							dispatch(setInitialFavorites(tracks));
						});
					}
				});
			} catch (error) {
				console.log(error);
			}
		}
	}, [user]);

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
