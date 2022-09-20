import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Button from './Button';
import type { IButton } from '../../../shared/types';

describe('<Button /> Link', () => {
	const mockProps: IButton = {
		label: 'click',
		element: 'link',
		to: 'https://alejandrodotor.com',
	};

	let component = render(<></>);
	beforeEach(() => {
		component = render(<Button {...mockProps} />);
	});

	test('Renders a anchor', () => {
		const element = component.container.querySelector('a');
		expect(element).toBeInTheDocument();
		expect(element).toHaveAttribute('href', mockProps.to);
	});
	test('Has correct classes', () => {
		const element = component.getByText(mockProps.label);
		const classType = mockProps.type || 'primary';
		expect(element).toHaveClass('button--' + classType);
	});
	test('Has correct label', () => {
		component.getByText(mockProps.label);
	});
});

describe('<Button /> Button', () => {
	const mockProps: IButton = {
		label: 'click',
		type: 'secondary',
		size: 'small',
		handleClick: jest.fn(),
	};

	let component = render(<></>);
	beforeEach(() => {
		component = render(<Button {...mockProps} />);
	});

	test('Renders a button', () => {
		expect(component.container.querySelector('button')).toBeInTheDocument();
	});
	test('Has correct classes', () => {
		const element = component.getByText(mockProps.label);
		const classType = mockProps.type || 'primary';
		const classSize = mockProps.size || '';

		expect(element).toHaveClass('button--' + classType);
		if (classSize.length > 0)
			expect(element).toHaveClass('button--' + classSize);
	});
	test('Has correct label', () => {
		component.getByText(mockProps.label);
	});
});
