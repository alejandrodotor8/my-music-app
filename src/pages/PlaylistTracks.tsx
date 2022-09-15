import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SpotifyApi } from '../services/api-spotify';
import MainContent from '../components/templates/Main-content/Main-content';
import Loader from '../components/atoms/Loader/Loader';
import Track from '../components/molecules/Track/Track';

import type { ITrack, IPlaylist } from '../shared/types';

function PlaylistTracks(): JSX.Element {
	const { playlistId } = useParams();
	const [playlistTracks, setPlaylistTracks] = useState<ITrack[]>([]);
	const [playlistInfo, setPlaylistInfo] = useState<IPlaylist>();
	const [loading, setLoading] = useState(false);
	const [token] = useState(localStorage.getItem('token'));

	useEffect(() => {
		if (token && playlistId) {
			try {
				setLoading(true);
				const api = new SpotifyApi(token);

				api.getPlaylist(playlistId).then((res) => {
					setPlaylistInfo({
						id: res.data.id,
						name: res.data.name,
						image: res.data.images[0]?.url,
						description: res.data.description,
						followers: res.data.followers.total,
					});
				});
				api.getPlaylistTracks(playlistId).then((res) => {
					const tracks: ITrack[] = [];
					res.data.items.forEach((item: any) => {
						tracks.push({
							id: item.track.id,
							name: item.track.name,
							artists: item.track.artists.map((item: any) => item.name),
							image: item.track.album.images[0]?.url,
							audio: item.track.preview_url,
						});
					});
					setPlaylistTracks(tracks);
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
			<>
				{playlistInfo && (
					<MainContent
						title={playlistInfo.name + 'songs'}
						description={playlistInfo.description}
					>
						{playlistTracks && token && (
							<ul className="tracks">
								{playlistTracks.map((track, index) => (
									<Track
										key={track.id}
										track={track}
										index={index + 1}
										token={token}
									/>
								))}
							</ul>
						)}
					</MainContent>
				)}
			</>
		);
	}
}

export default PlaylistTracks;
