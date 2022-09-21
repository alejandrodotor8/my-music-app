import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Header from './Header';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';

import { IUser } from '../../../shared/types';

describe('<Header /> Not Auth', () => {
	const mockProps = {
		isAuthenticated: false,
		user: {} as IUser,
		logout: jest.fn(),
	};

	let component = render(<></>);
	beforeEach(() => {
		component = render(
			<BrowserRouter>
				<Header {...mockProps} />
			</BrowserRouter>
		);
	});

	test('Has title => My music', () => {
		expect(component.getByText('My music')).toBeInTheDocument();
	});
	test('Has header element', () => {
		expect(component.container.querySelector('header')).toBeInTheDocument();
	});
	test('Has no nav element', () => {
		expect(component.container.querySelector('nav')).not.toBeInTheDocument();
	});
});

describe('<Header /> is Auth', () => {
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

	test('Has title => My music', () => {
		expect(component.getByText('My music')).toBeInTheDocument();
	});
	test('Has header element', () => {
		expect(component.container.querySelector('header')).toBeInTheDocument();
	});
	test('Has nav element', () => {
		expect(component.container.querySelector('nav')).toBeInTheDocument();
	});
	test('Has profile picture element', () => {
		expect(
			component.container.querySelector('.menu__profile-picture')
		).toBeInTheDocument();
	});
	test('Click log out button', () => {
		const logoutBtn = component.getByText('Log out');
		fireEvent.click(logoutBtn);
		expect(mockProps.logout).toHaveBeenCalledTimes(1);
	});
});
