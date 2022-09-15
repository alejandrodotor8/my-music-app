import { ReactNode } from 'react';
import './Main-content.scss';

interface Props {
	title: string;
	description: string;
	children: ReactNode;
}

export default function MainContent({ title, description, children }: Props) {
	return (
		<main className="main-content">
			<h2 className="main-content__title">{title}</h2>
			<p className="main-content__description">{description}</p>
			<section className="main-content__section">{children}</section>
		</main>
	);
}
