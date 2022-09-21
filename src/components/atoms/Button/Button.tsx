import type { IButton } from '../../../shared/types';
import './Button.scss';

function Button({
	label,
	element = 'button',
	type = 'primary',
	size,
	to,
	handleClick,
}: IButton): JSX.Element {
	const classes = `button button--${type} ${size ? 'button--' + size : ''}`;
	if (element == 'link') {
		return (
			<a className={classes} href={to}>
				{label}
			</a>
		);
	} else {
		return (
			<button onClick={handleClick} className={classes}>
				{label}
			</button>
		);
	}
}
export default Button;
