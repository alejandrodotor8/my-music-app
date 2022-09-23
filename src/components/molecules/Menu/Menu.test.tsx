import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Menu from './Menu';
import NavLink from '@atoms/Nav-link/Nav-link';

describe('<Menu /> closed has right:', () => {
	const mockProps = {
		isOpen: false,
		children: (
			<>
				<NavLink to="/profile" label="Profile" handleClick={() => {}} />
				<NavLink to="/" label="Home" handleClick={() => {}} />
			</>
		),
	};

	beforeEach(() => {
		render(
			<BrowserRouter>
				<Menu {...mockProps} />
			</BrowserRouter>
		);
	});

	test('Nav elem', () => {
		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});
	test('Class name', () => {
		expect(screen.getByRole('navigation')).not.toHaveClass('menu-open');
	});
	test('Children', () => {
		expect(screen.getByRole('navigation').children.length).toBe(2);
		expect(screen.getAllByRole('link').length).toBe(2);
	});
});

describe('<Menu /> open has right:', () => {
	const mockProps = {
		isOpen: true,
		children: (
			<>
				<NavLink to="/profile" label="Profile" handleClick={() => {}} />
			</>
		),
	};

	beforeEach(() => {
		render(
			<BrowserRouter>
				<Menu {...mockProps} />
			</BrowserRouter>
		);
	});

	test('Class name', () => {
		expect(screen.getByRole('navigation')).toHaveClass('menu-open');
	});
	test('Children', () => {
		expect(screen.getByRole('navigation').children.length).toBe(1);
		expect(screen.getAllByRole('link').length).toBe(1);
	});
});
