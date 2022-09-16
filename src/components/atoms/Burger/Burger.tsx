import './Burger.scss';

interface Props {
	handleClickBurger: () => void;
	isOpen: boolean;
}

export default function Burger({ handleClickBurger, isOpen }: Props) {
	return (
		<button
			onClick={handleClickBurger}
			className={`burger ${isOpen ? 'burger--open' : ''}`}
		>
			<div></div>
			<div></div>
			<div></div>
		</button>
	);
}
