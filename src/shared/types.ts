import { ReactNode } from 'react';

export interface IPropsChildren {
	children?: ReactNode;
}

type Btn = 'a' | 'b';
export interface IButton {
	text: string;
	to: string;
	type: Btn;
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
