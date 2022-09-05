import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '/vite.svg';

function Header() {
	return (
		<header className="header">
			<Link to="/" className="header__link">
				<img src={logo} alt="logo icon" />
				<h1>My music</h1>
			</Link>
		</header>
	);
}

export default Header;
