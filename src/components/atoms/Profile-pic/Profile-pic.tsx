import { ReactNode } from 'react';
import pp_base from '@/assets/img/pp_base.png';
import { ESize } from '@/shared/types';
import './Profile-pic.scss';

interface Props {
	image: string;
	size?: ESize;
	customClasses?: string;
	children?: ReactNode;
}

export default function ProfilePic({
	image,
	size,
	children,
	customClasses = '',
}: Props) {
	const classSize =
		size === ESize.BIG ? 'profile-picture--big' : 'profile-picture--normal';
	return (
		<figure className="profile-picture">
			<img
				src={image ?? pp_base}
				className={classSize + ' ' + customClasses}
				alt="Profile picture"
			/>
			{children}
		</figure>
	);
}
