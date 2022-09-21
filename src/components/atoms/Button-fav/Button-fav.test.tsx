import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import ButtonFav from './Button-fav';

describe('<ButtonFav> is not fav', () => {
	const mockProps = {
		isFav: false,
		handleClick: jest.fn(),
	};
	let component = render(<></>);
	beforeEach(() => {
		component = render(<ButtonFav {...mockProps} />);
	});

	test('Has correct classes', () => {
		expect(component.container.querySelector('path')).not.toHaveClass(
			'button-fav--isFav'
		);
	});

	test('Click button', () => {
		const button = component.container.querySelector('button');
		if (button) fireEvent.click(button);

		expect(mockProps.handleClick).toBeCalledTimes(1);
	});
});

describe('<ButtonFav> is not fav', () => {
	const mockProps = {
		isFav: true,
		handleClick: jest.fn(),
	};
	let component = render(<></>);
	beforeEach(() => {
		component = render(<ButtonFav {...mockProps} />);
	});

	test('Has correct classes', () => {
		expect(component.container.querySelector('path')).toHaveClass(
			'button-fav--isFav'
		);
	});
});
