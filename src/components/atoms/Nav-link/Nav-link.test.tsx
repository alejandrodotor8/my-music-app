import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import NavLink from './Nav-link';

describe('<Header /> Not Auth', () => {
	const mockProps = {
		to: '/test',
		label: 'test link',
		handleClick: jest.fn(),
	};

	let component = render(<></>);
	beforeEach(() => {
		component = render(
			<BrowserRouter>
				<NavLink {...mockProps} />
			</BrowserRouter>
		);
	});

	test('Has <a>', () => {
		expect(component.container.querySelector('a')).toBeInTheDocument();
	});
	test('Has correct text', () => {
		expect(component.getByText(mockProps.label)).toBeInTheDocument();
	});
	test('Has correct attrs', () => {
		const a = component.container.querySelector('a');
		expect(a).toHaveAttribute('href', mockProps.to);
	});
	test('Has on Click event', () => {
		const a = component.container.querySelector('a');
		if (a) fireEvent.click(a);
		expect(mockProps.handleClick).toHaveBeenCalledTimes(1);
	});
});
