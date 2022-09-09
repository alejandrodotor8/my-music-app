import { useState, useEffect } from 'react';
import { SpotifyApi } from '../services/api-spotify';
import { useAppDispatch } from '../Hooks/reduxHooks';
import { setUser } from '../store/slices/userSlice';
import Loader from '../components/atoms/Loader';
import Track from '../components/molecules/Track';

import type { ITrack } from '../shared/types';

function Home(): JSX.Element {
	const [token] = useState(localStorage.getItem('token_spotify'));
	const [topGlobalplaylist, setTopGlobalplaylist] = useState<ITrack[]>();
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log('Render Home');

		if (token) {
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
					const tracks: ITrack[] = [];
					res.data.items.forEach((item: any) => {
						tracks.push({
							id: item.track.id,
							name: item.track.name,
							artists: item.track.artists.map((item: any) => item.name),
							image: item.track.album.images[0].url,
							audio: item.track.preview_url,
						});
					});

					setTopGlobalplaylist(tracks);
				});
			} catch (error) {
				console.log(error);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 200);
			}
		}
	}, []);

	if (loading) {
		return <Loader />;
	} else {
		return (
			<main className="home">
				<h2>Top 50 Global songs!</h2>
				<p>Add the best tracks to you favorites playlist</p>
				<section>
					{topGlobalplaylist && (
						<ul className="tracks">
							{topGlobalplaylist.map((track, index) => (
								<Track track={track} index={index + 1} key={track.id} />
							))}
						</ul>
					)}
				</section>
			</main>
		);
	}
}

export default Home;
