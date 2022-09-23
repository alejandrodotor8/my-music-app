import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Track from './Track';

describe('<Track /> has right:', () => {
	const mockProps = {
		position: 10,
		track: {
			id: '123456',
			name: 'Track98',
			artists: ['Alejo98'],
			image: 'url',
			audio: 'url',
		},
		handleClick: jest.fn(),
		isFav: false,
	};

	beforeEach(() => {
		render(<Track {...mockProps} />);
	});

	test('List item', () => {
		expect(screen.getByRole('listitem')).toBeInTheDocument();
	});

	test('position elem', () => {
		expect(screen.getByText(mockProps.position)).toBeInTheDocument();
	});
	test('track name', () => {
		expect(screen.getByText(mockProps.track.name)).toBeInTheDocument();
	});
	test('track artist', () => {
		expect(
			screen.getByText(mockProps.track.artists.join())
		).toBeInTheDocument();
	});
});
