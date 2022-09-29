import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { AuthContext } from '@/Hooks/useAuth';
import { PlayerProvider } from '@/Hooks/usePlayer';

import { MockSpotifyApi } from '../__test__/mockDataSpotify';
import Search from '../Search';

const MockProviderSearch = () => {
	const isAuthenticated = true;
	const api = new MockSpotifyApi() as any;

	const login = jest.fn();
	const logout = jest.fn();
	return (
		<PlayerProvider>
			<AuthContext.Provider value={{ isAuthenticated, api, login, logout }}>
				<Provider store={store}>
					<Search />
				</Provider>
			</AuthContext.Provider>
		</PlayerProvider>
	);
};

describe('<Search /> should', () => {
	beforeEach(() => {
		render(<MockProviderSearch />);
	});

	test('Have Input', () => {
		const input = screen.getByPlaceholderText('Type for search a song');
		expect(input).toBeInTheDocument();
	});
	test('Have Input value', () => {
		const value = 'name song';
		const input = screen.getByPlaceholderText<HTMLInputElement>(
			'Type for search a song'
		);
		fireEvent.change(input, { target: { value } });
		expect(input.value).toBe(value);
	});
	test('Have Input value reset', () => {
		const value = 'name song';
		const input = screen.getByPlaceholderText<HTMLInputElement>(
			'Type for search a song'
		);
		fireEvent.change(input, { target: { value } });
		fireEvent.submit(input);
		expect(input.value).toBe('');
	});

	/* test('Input value results', async () => {
		const value = 'name song';
		const input = screen.getByPlaceholderText<HTMLInputElement>(
			'Type for search a song'
		);
		fireEvent.change(input, { target: { value } });
		fireEvent.submit(input);

		const list = await screen.findByRole('list');
		expect(list).toBeInTheDocument();
		screen.debug();
	}); */
});
