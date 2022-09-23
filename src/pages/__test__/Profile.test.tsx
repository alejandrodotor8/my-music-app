import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { AuthProvider } from '@/Hooks/useAuth';
import Profile from '../Profile';

describe('<Profile />', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<AuthProvider>
					<BrowserRouter>
						<Profile />
					</BrowserRouter>
				</AuthProvider>
			</Provider>
		);
	});
	test('test', () => {
		expect(1).toBe(1);
	});
});
