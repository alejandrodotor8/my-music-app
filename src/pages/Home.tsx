import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../Hooks/reduxHooks';
import { setFavoritesPlaylist } from '../store/slices/favoritePlaylistSlice';
import { setInitialFavorites } from '../store/slices/favoritesTracksSlice';
import { useAuth } from '../Hooks/useAuth';
import MainContent from '../components/templates/Main-content/Main-content';
import Playlist from '../components/molecules/Playlist/Playlist';
import SkeletonPlaylist from '../components/molecules/Skeletons/Skeleton-playlist/Skeleton-playlist';
import type { IPlaylist, IPlaylistFav, ITrack } from '../shared/types';

export default function Home(): JSX.Element {
	const [loading, setLoading] = useState(false);
	const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
	const playlistsState = useAppSelector((state) => state.playlists.value);
	const { api } = useAuth();
	const user = useAppSelector((state) => state.user.value);

	const dispatch = useAppDispatch();

	//Trae las playlist iniciales
	useEffect(() => {
		console.log('Render Home');
		if (playlistsState.length > 0) {
			setLoading(true);

			const promises = playlistsState.map((item) => api.getPlaylist(item));

			Promise.all(promises)
				.then((values) => {
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
				})
				.catch((error) => console.log(error))
				.finally(() => {
					/* setTimeout(() => {
					}, 200); */
					setLoading(false);
				});
		}
	}, []);

	//Trae la playlist de favoritos
	useEffect(() => {
		if (user.id && api) {
			api.getFavoritesPlaylist(user.id, 50)
				.then((res: IPlaylistFav) => {
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
				})
				.catch((error) => console.log(error));
		}
	}, [user]);

	return (
		<MainContent
			title="Best Spotify playlists!"
			description="choose one and add the best tracks to you favorites playlist"
		>
			{loading ? (
				<ul className="playlist">
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<SkeletonPlaylist key={item} />
					))}
				</ul>
			) : (
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
		</MainContent>
	);
}
