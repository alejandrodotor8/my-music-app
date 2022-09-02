import '../../styles/organisms/Header.scss';
import logo from '/vite.svg';

function Header() {
	return (
		<header className="header">
			<img src={logo} alt="logo icon" />
			<h1>My music</h1>
		</header>
	);
}

export default Header;
