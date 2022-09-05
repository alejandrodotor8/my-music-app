import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import './Footer.scss';

function Footer() {
	const { logout, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const handleClick = (): void => {
		logout();
		navigate('/signin');
	};
	return (
		<footer className="footer">
			<p>
				Made with &#x1F49C;
				<a href="https://github.com/alejandrodotor8"> @alejandrodotor8</a>
			</p>
			{isAuthenticated ? (
				<button onClick={handleClick}>Log out</button>
			) : null}
		</footer>
	);
}

export default Footer;
