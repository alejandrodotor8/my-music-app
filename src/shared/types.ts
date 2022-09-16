import { ReactNode } from 'react';

export interface IPropsChildren {
	children?: ReactNode;
}

type Element = 'link' | 'button';
type Type = 'primary' | 'secondary';
type Size = 'big' | 'small';
export interface IButton {
	label: string;
	element: Element;
	type?: Type;
	to?: string;
	handleClick?: () => void;
	size?: Size;
}

export interface IUser {
	id: string;
	name: string;
	image: string;
}
export interface ITrack {
	id: string;
	name: string;
	artists: string[];
	image: string;
	audio: string;
}

export interface IPlaylist {
	id: string;
	name: string;
	image: string;
	followers: number;
	description: string;
}

export interface IPlaylistFav extends Omit<IPlaylist, 'followers'> {}
