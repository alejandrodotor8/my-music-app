import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AudioPlayer from './Audio-player';

describe('<AudioPlayer /> No Audio should:', () => {
	const mockProps = {
		image: 'https://i.scdn.co/image/ab67616d0000b2739b19c107109de740bad72df5',
		audioUrl: '',
	};

	beforeEach(() => {
		render(<AudioPlayer {...mockProps} />);
	});

	test('Render image', () => {
		expect(screen.getByRole('img')).toBeInTheDocument();
	});
	test('Not render Audio and Button', () => {
		expect(screen.queryByTestId('player-audio')).not.toBeInTheDocument();
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});
});

describe('<AudioPlayer /> with Audio should', () => {
	const mockProps = {
		image: 'https://i.scdn.co/image/ab67616d0000b2739b19c107109de740bad72df5',
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
		expect(screen.queryByTestId('player-audio')).toHaveAttribute(
			'src',
			mockProps.audioUrl
		);
	});
});
