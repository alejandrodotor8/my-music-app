import '../../styles/atoms/button-primary.scss';
function Button({ children, type, to }) {
	if (type == 'a') {
		return (
			<a className="button-primary" href={to}>
				{children}
			</a>
		);
	} else {
		<button className="button-primary">{children}</button>;
	}
}
export default Button;
