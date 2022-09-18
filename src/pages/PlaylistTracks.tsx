import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../Hooks/reduxHooks';
import { addTrack, removeTrack } from '../store/slices/favoritesTracksSlice';
import changeFavorite from '../services/change-favorite';
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
	const { api } = useAuth();

	const dispatch = useAppDispatch();
	const favPlaylistID = useAppSelector(
		(state) => state.favoritePlaylist.value.id
	);
	const favPlaylist = useAppSelector((state) => state.favoritesTracks.value);

	const handleClick = (track: ITrack) => {
		changeFavorite(
			favPlaylist,
			track,
			favPlaylistID,
			api,
			dispatch,
			addTrack,
			removeTrack
		);
	};

	useEffect(() => {
		if (token && playlistId && api) {
			try {
				setLoading(true);

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
										position={index + 1}
										handleClick={() => handleClick(track)}
										track={track}
										isFav={favPlaylist.some(
											(item) => item.id === track.id
										)}
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
