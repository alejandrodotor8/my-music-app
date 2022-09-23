import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Playlist from './Playlist';

describe('<Playlist /> has right:', () => {
	const mockProps = {
		id: '1323',
		name: 'Playlist name',
		image: 'url',
		followers: 3000,
	};

	beforeEach(() => {
		render(
			<BrowserRouter>
				<Playlist {...mockProps} />
			</BrowserRouter>
		);
	});

	test('Semantic elements', () => {
		expect(screen.getByRole('link')).toBeInTheDocument();
		expect(screen.getByRole('link')).toHaveAttribute(
			'href',
			`/playlist/${mockProps.id}`
		);
		expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
		expect(screen.getByText(mockProps.name)).toBeInTheDocument();
		expect(screen.getByAltText('playlist image')).toBeInTheDocument();
		expect(screen.getByText('3K')).toBeInTheDocument();
	});
});

describe('<Playlist /> has right followers:', () => {
	const mockProps = {
		id: '1323',
		name: 'Playlist name',
		image: 'url',
	};

	test('150.2K', () => {
		render(
			<BrowserRouter>
				<Playlist {...mockProps} followers={150200} />
			</BrowserRouter>
		);
		expect(screen.getByText('150.2K')).toBeInTheDocument();
	});
	test('4.5K', () => {
		render(
			<BrowserRouter>
				<Playlist {...mockProps} followers={4500} />
			</BrowserRouter>
		);
		expect(screen.getByText('4.5K')).toBeInTheDocument();
	});
	test('3M', () => {
		render(
			<BrowserRouter>
				<Playlist {...mockProps} followers={3000000} />
			</BrowserRouter>
		);
		expect(screen.getByText('3M')).toBeInTheDocument();
	});
	test('3.9M', () => {
		render(
			<BrowserRouter>
				<Playlist {...mockProps} followers={3850000} />
			</BrowserRouter>
		);
		expect(screen.getByText('3.9M')).toBeInTheDocument();
	});
	test('10.8M', () => {
		render(
			<BrowserRouter>
				<Playlist {...mockProps} followers={10800000} />
			</BrowserRouter>
		);
		expect(screen.getByText('10.8M')).toBeInTheDocument();
	});
	test('200.2M', () => {
		render(
			<BrowserRouter>
				<Playlist {...mockProps} followers={200200545} />
			</BrowserRouter>
		);
		expect(screen.getByText('200.2M')).toBeInTheDocument();
	});
});
