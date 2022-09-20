import './Burger.scss';

interface Props {
	handleClickBurger: () => void;
	isOpen: boolean;
}

export default function Burger({ handleClickBurger, isOpen }: Props) {
	const classes = `burger ${isOpen ? 'burger--open' : ''}`;
	return (
		<button onClick={handleClickBurger} className={classes}>
			<div></div>
			<div></div>
			<div></div>
		</button>
	);
}
