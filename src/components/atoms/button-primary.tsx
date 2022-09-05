import { IButton } from '../../shared/types';
import './button-primary.scss';
function Button({ text, type, to }: IButton): JSX.Element {
	if (type == 'a') {
		return (
			<a className="button-primary" href={to}>
				{text}
			</a>
		);
	} else {
		return <button className="button-primary">{text}</button>;
	}
}
export default Button;
