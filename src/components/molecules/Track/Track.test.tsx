import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PlayerProvider } from '@/Hooks/usePlayer';
import { AuthProvider } from '@/Hooks/useAuth';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

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
	};

	beforeEach(() => {
		render(
			<Provider store={store}>
				<AuthProvider>
					<PlayerProvider>
						<Track {...mockProps} />
					</PlayerProvider>
				</AuthProvider>
			</Provider>
		);
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
