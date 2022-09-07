import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { useAppDispatch } from '../../Hooks/reduxHooks';
import { resetUser } from '../../store/slices/userSlice';
import './Footer.scss';

function Footer() {
	const { logout, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const handleClick = (): void => {
		logout();
		dispatch(resetUser());
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
