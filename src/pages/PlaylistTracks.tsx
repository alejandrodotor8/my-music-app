import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import MainContent from '../components/templates/Main-content/Main-content';
import SkeletonTrack from '../components/molecules/Skeletons/Skeleton-track/Skeleton-track';
import Track from '../components/molecules/Track/Track';

import type { ITrack, IPlaylist } from '../shared/types';

function PlaylistTracks(): JSX.Element {
	const { playlistId } = useParams();
	const [playlistTracks, setPlaylistTracks] = useState<ITrack[]>([]);
	const [playlistInfo, setPlaylistInfo] = useState<IPlaylist>();
	const [loading, setLoading] = useState(false);
	const { api } = useAuth();

	useEffect(() => {
		if (playlistId && api) {
			setLoading(true);
			const promises = [
				api.getPlaylist(playlistId),
				api.getPlaylistTracks(playlistId),
			];

			Promise.all(promises)
				.then((values) => {
					const resPlaylist = values[0].data;
					const resPlaylistTracks = values[1].data;

					const tracks: ITrack[] = [];
					resPlaylistTracks.items.forEach((item: any) => {
						tracks.push({
							id: item.track.id,
							name: item.track.name,
							artists: item.track.artists.map((item: any) => item.name),
							image: item.track.album.images[0]?.url,
							audio: item.track.preview_url,
						});
					});

					setPlaylistInfo({
						id: resPlaylist.id,
						name: resPlaylist.name,
						image: resPlaylist.images[0]?.url,
						description: resPlaylist.description,
						followers: resPlaylist.followers.total,
					});

					setPlaylistTracks(tracks);
				})
				.catch((error) => console.log(error))
				.finally(() => {
					setLoading(false);
				});
		}
	}, []);

	if (!loading && playlistInfo) {
		return (
			<MainContent
				title={playlistInfo.name + 'songs'}
				description={playlistInfo.description}
			>
				<ul className="tracks">
					{playlistTracks.map((track, index) => (
						<Track key={track.id} position={index + 1} track={track} />
					))}
				</ul>
			</MainContent>
		);
	} else {
		return (
			<MainContent title="Playlist" description="the best songs">
				<ul className="tracks">
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
						<SkeletonTrack key={item} />
					))}
				</ul>
			</MainContent>
		);
	}
}

export default PlaylistTracks;
