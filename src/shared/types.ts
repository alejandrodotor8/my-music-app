import { ReactNode } from 'react';

export interface IPropsChildren {
	children?: ReactNode;
}

export enum EBtnElement {
	LINK = 'link',
	BUTTON = 'button',
}
export enum EType {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}
export enum ESize {
	BIG = 'big',
	SMALL = 'small',
}
export interface IButton {
	label: string;
	element?: EBtnElement;
	type?: EType;
	to?: string;
	handleClick?: () => void;
	size?: ESize;
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
