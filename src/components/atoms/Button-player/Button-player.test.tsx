import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PlayerProvider } from '@/Hooks/usePlayer';
import ButtonPlayer from './Button-player';

describe('<ButtonPlayer /> should', () => {
	const mockProps = {
		audio: 'https://p.scdn.co/mp3-preview/0a51a10b22c93ee8b214fe4a87a0b37fe98687f6?cid=8c87272c262b4a81b19e595464e39c6c',
	};

	beforeEach(() => {
		render(
			<PlayerProvider>
				<ButtonPlayer {...mockProps} />
			</PlayerProvider>
		);
	});
	test(' Render Button', () => {
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
	test('Have audio paused at start', () => {
		expect(screen.getByRole('button')).toHaveClass('play-icon');
	});
});
