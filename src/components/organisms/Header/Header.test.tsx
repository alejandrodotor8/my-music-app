import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Header from './Header';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

import { IUser } from '@/shared/types';

describe('<Header />', () => {
	describe('No Auth has right:', () => {
		const mockProps = {
			isAuthenticated: false,
			user: {} as IUser,
		};

		let component = render(<></>);
		beforeEach(() => {
			component = render(
				<Provider store={store}>
					<BrowserRouter>
						<Header {...mockProps} />
					</BrowserRouter>
				</Provider>
			);
		});

		test('Title', () => {
			expect(component.getByText('My music')).toBeInTheDocument();
		});
		test('Header element', () => {
			expect(
				component.container.querySelector('header')
			).toBeInTheDocument();
		});
		test('No nav element', () => {
			expect(
				component.container.querySelector('nav')
			).not.toBeInTheDocument();
		});
	});

	describe('Auth has right', () => {
		const mockProps = {
			isAuthenticated: true,
			user: {
				id: 'diegodotor.98',
				name: 'Alejandro Dotor',
				image: 'https://i.scdn.co/image/ab6775700000ee8586b09dd8b1f3e0978999c267',
			},
			logout: jest.fn(),
		};

		let component = render(<></>);
		beforeEach(() => {
			component = render(
				<Provider store={store}>
					<BrowserRouter>
						<Header {...mockProps} />
					</BrowserRouter>
				</Provider>
			);
		});

		test('Nav element', () => {
			expect(component.container.querySelector('nav')).toBeInTheDocument();
		});
		test('Profile picture element', () => {
			expect(
				component.container.querySelector('.menu__profile-picture')
			).toBeInTheDocument();
		});
	});
});
