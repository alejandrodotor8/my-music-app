import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import AudioPlayer from './Audio-player';

describe('<AudioPlayer /> No Audio', () => {
	const mockProps = {
		image: 'https://i.scdn.co/image/ab67616d0000b2739b19c107109de740bad72df5',
		audioUrl: '',
	};

	let component = render(<></>);
	beforeEach(() => {
		component = render(<AudioPlayer {...mockProps} />);
	});

	test('Has image', () => {
		expect(component.container.querySelector('img')).toBeInTheDocument();
	});
	test('Has no Audio', () => {
		expect(
			component.container.querySelector('audio')
		).not.toBeInTheDocument();
		expect(
			component.container.querySelector('button')
		).not.toBeInTheDocument();
	});
});

describe('<AudioPlayer /> with Audio', () => {
	const mockProps = {
		image: 'https://i.scdn.co/image/ab67616d0000b2739b19c107109de740bad72df5',
		audioUrl:
			'https://p.scdn.co/mp3-preview/0a51a10b22c93ee8b214fe4a87a0b37fe98687f6?cid=8c87272c262b4a81b19e595464e39c6c',
	};

	let component = render(<></>);
	beforeEach(() => {
		component = render(<AudioPlayer {...mockProps} />);
	});
	test('Has Audio', () => {
		expect(component.container.querySelector('audio')).toBeInTheDocument();
		expect(component.container.querySelector('button')).toBeInTheDocument();
	});
	test('Audio is paused at start', () => {
		const audio = component.container.querySelector('audio');
		if (audio) expect(audio.paused).toBeTruthy();
	});
});
