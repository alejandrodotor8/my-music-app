import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AudioPlayer from './Audio-player';

describe('<AudioPlayer /> should', () => {
	const mockProps = {
		audioUrl:
			'https://p.scdn.co/mp3-preview/0a51a10b22c93ee8b214fe4a87a0b37fe98687f6?cid=8c87272c262b4a81b19e595464e39c6c',
	};

	beforeEach(() => {
		render(<AudioPlayer {...mockProps} />);
	});
	test(' Render Audio and Button', () => {
		expect(screen.queryByTestId('player-audio')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
	test('Have audio paused at start', () => {
		expect(
			screen.queryByTestId<HTMLAudioElement>('player-audio')?.paused
		).toBeTruthy();
	});
	test('Have audio src', () => {
		expect(screen.queryByTestId('player-audio-source')).toHaveAttribute(
			'src',
			mockProps.audioUrl
		);
	});
});
