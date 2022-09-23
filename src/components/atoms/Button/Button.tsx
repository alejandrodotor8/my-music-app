import { IButton, EBtnElement, EType } from '@/shared/types';
import './Button.scss';

function Button({
	label,
	element = EBtnElement.BUTTON,
	type = EType.PRIMARY,
	size,
	to,
	handleClick,
}: IButton): JSX.Element {
	const classes = `button button--${type} ${size && 'button--' + size}`;
	return (
		<>
			{element == 'link' ? (
				<a className={classes} href={to}>
					{label}
				</a>
			) : (
				<button onClick={handleClick} className={classes}>
					{label}
				</button>
			)}
		</>
	);
}
export default Button;
