import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import '../../styles/organisms/Footer.scss';

function Footer() {
	const { logout, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const handleClick = (): void => {
		logout();
		navigate('/signin');
	};
	return (
		<footer className="footer">
			<p>this is the footer</p>
			{isAuthenticated ? (
				<button onClick={handleClick}>Log out</button>
			) : null}
		</footer>
	);
}

export default Footer;
