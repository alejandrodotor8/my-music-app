import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Burger from './Burger';

describe('<Burger /> Closed', () => {
	const mockProps = {
		handleClickBurger: jest.fn(),
		isOpen: false,
	};

	let component = render(<></>);
	beforeEach(() => {
		component = render(<Burger {...mockProps} />);
	});

	test('Click burger btn', () => {
		const button = component.container.querySelector('button');
		if (button) fireEvent.click(button);
		expect(mockProps.handleClickBurger).toHaveBeenCalledTimes(1);
	});

	test('Has no burger--open class', () => {
		expect(component.container.querySelector('button')).not.toHaveClass(
			'burger--open'
		);
	});
});
describe('<Burger /> Open', () => {
	const mockProps = {
		handleClickBurger: jest.fn(),
		isOpen: true,
	};

	let component = render(<></>);
	beforeEach(() => {
		component = render(<Burger {...mockProps} />);
	});

	test('Has burger--open class', () => {
		expect(component.container.querySelector('button')).toHaveClass(
			'burger--open'
		);
	});
});
