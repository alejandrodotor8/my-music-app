import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';
import { IButton, EBtnElement, ESize, EType } from '@/shared/types';

describe('<Button /> Link should', () => {
	const mockProps: IButton = {
		label: 'click',
		element: EBtnElement.LINK,
		to: 'https://alejandrodotor.com',
	};

	beforeEach(() => render(<Button {...mockProps} />));

	test('Renders a anchor', () => {
		const element = screen.getByRole('link', { name: mockProps.label });
		expect(element).toBeInTheDocument();
		expect(element).toHaveAttribute('href', mockProps.to);
	});
	test('Have classes', () => {
		const element = screen.getByRole('link', { name: mockProps.label });
		const classType = mockProps.type || EType.PRIMARY;
		expect(element).toHaveClass('button--' + classType);
	});
});

describe('<Button /> Button should', () => {
	const mockProps: IButton = {
		label: 'click',
		type: EType.SECONDARY,
		size: ESize.SMALL,
		handleClick: jest.fn(),
	};

	beforeEach(() => render(<Button {...mockProps} />));

	test('Renders a button', () => {
		expect(
			screen.getByRole('button', { name: mockProps.label })
		).toBeInTheDocument();
	});
	test('Have classes', () => {
		const element = screen.getByRole('button', { name: mockProps.label });
		const classType = mockProps.type || EType.PRIMARY;
		const classSize = mockProps.size || '';

		expect(element).toHaveClass('button--' + classType);
		if (classSize.length > 0)
			expect(element).toHaveClass('button--' + classSize);
	});
	test('Have Click in button', () => {
		const element = screen.getByRole('button', { name: mockProps.label });
		fireEvent.click(element);

		expect(mockProps.handleClick).toHaveBeenCalledTimes(1);
	});
});
