import React, { useState } from 'react';
import MainContent from '../components/templates/Main-content/Main-content';
import Input from '../components/atoms/Input/Input';

export default function Search() {
	const [searchValue, setSearchValue] = useState('');
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(searchValue);
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
			</div>
		</MainContent>
	);
}
