import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Input from './Input';

describe('<Input>', () => {
	const mockProps = {
		placeholder: 'this is a place holder',
		type: 'text',
		handleChange: jest.fn(),
		value: 'initial',
		disabled: false,
	};
	let component = render(<></>);
	beforeEach(() => {
		component = render(<Input {...mockProps} />);
	});

	test('Renders an Input', () => {
		expect(component.container.querySelector('input')).toBeInTheDocument();
	});
	test('Has correct attributes', () => {
		const input = component.container.querySelector('input');
		expect(input).toHaveAttribute('placeholder', mockProps.placeholder);
		expect(input).toHaveAttribute('value', mockProps.value);
		expect(input).toHaveAttribute('type', mockProps.type);
	});
	test('Has no class disabled', () => {
		expect(
			component.container.querySelector('.container-input')
		).not.toHaveClass('container-input--disabled');
	});
	test('Has correct onChange event', () => {
		const input = component.container.querySelector('input');
		if (input) fireEvent.change(input, { target: { value: 'typing' } });
		expect(mockProps.handleChange).toHaveBeenCalledTimes(1);
	});
	test('Has only one child element(input)', () => {
		expect(
			component.container.querySelector('.container-input')?.children.length
		).toBe(1);
	});
});

describe('<Input> with children and disabled', () => {
	const mockProps = {
		placeholder: 'this is a place holder',
		type: 'text',
		handleChange: jest.fn(),
		value: 'initial',
		disabled: true,
		children: <button>children elem</button>,
	};
	let component = render(<></>);
	beforeEach(() => {
		component = render(<Input {...mockProps} />);
	});

	test('Has class disabled', () => {
		expect(component.container.querySelector('.container-input')).toHaveClass(
			'container-input--disabled'
		);
	});

	test('Has children element', () => {
		expect(
			component.container.querySelector('.container-input')?.children.length
		).toBe(2);
		expect(component.getByText('children elem')).toBeInTheDocument();
	});
});
