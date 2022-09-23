import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Burger from './Burger';

describe('<Burger /> Closed should', () => {
	const mockProps = {
		handleClickBurger: jest.fn(),
		isOpen: false,
	};

	beforeEach(() => {
		render(<Burger {...mockProps} />);
	});

	test('Can click burger btn', () => {
		const button = screen.getByRole('button');
		fireEvent.click(button);
		expect(mockProps.handleClickBurger).toHaveBeenCalledTimes(1);
	});

	test('Have no burger--open class', () => {
		expect(screen.getByRole('button')).not.toHaveClass('burger--open');
	});
});
describe('<Burger /> Open should', () => {
	const mockProps = {
		handleClickBurger: jest.fn(),
		isOpen: true,
	};
	beforeEach(() => {
		render(<Burger {...mockProps} />);
	});

	test('Have burger--open class', () => {
		expect(screen.getByRole('button')).toHaveClass('burger--open');
	});
});
