import React, { useState } from 'react';
import MainContent from '../components/templates/Main-content/Main-content';
import { useAuth } from '../Hooks/useAuth';
import Track from '../components/molecules/Track/Track';
import Input from '../components/atoms/Input/Input';
import Loader from '../components/atoms/Loader/Loader';
import { ITrack } from '../shared/types';

export default function Search() {
	const [searchedTracks, setSearchedTracks] = useState<ITrack[]>([]);
	const [searchValue, setSearchValue] = useState('');
	const [loading, setLoading] = useState(false);
	const { api } = useAuth();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		api.searchTrackItem(searchValue)
			.then((res) => {
				const _tracks: ITrack[] = [];
				res.data.tracks.items.forEach((item: any) => {
					_tracks.push({
						id: item.id,
						name: item.name,
						artists: item.artists.map((item: any) => item.name),
						image: item.album.images[0]?.url,
						audio: item.preview_url,
					});
				});
				setSearchedTracks(_tracks);
				setLoading(false);
			})
			.catch((err) => console.log(err));
		setSearchValue('');
	};

	const handleSearchChange = (value: string) => {
		setSearchValue(value);
	};
	return (
		<MainContent
			title="Spotify search"
			description="Search for any track by any artist at any time"
		>
			<div className="search">
				<form action="search__form" onSubmit={handleSubmit}>
					<Input
						value={searchValue}
						type="text"
						placeholder="Type for search a song"
						handleChange={handleSearchChange}
						disabled={searchValue.length <= 0}
					>
						<button
							type="submit"
							className="container-input__button"
							disabled={searchValue.length <= 0}
						>
							<i className="fa-solid fa-arrow-right"></i>
						</button>
					</Input>
				</form>
				{!loading && searchedTracks ? (
					<>
						{searchedTracks.length > 0 ? (
							<ul className="tracks">
								{searchedTracks.map((track, index) => (
									<Track
										key={track.id}
										position={index + 1}
										track={track}
									/>
								))}
							</ul>
						) : (
							<p className="no-results-found">
								No results found &#128270;
							</p>
						)}
					</>
				) : (
					<Loader />
				)}
			</div>
		</MainContent>
	);
}
