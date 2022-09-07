import { Link } from 'react-router-dom';
import { useAppSelector } from '../../Hooks/reduxHooks';

import './Header.scss';
import logo from '/vite.svg';

function Header() {
	const user = useAppSelector((state) => state.user.value);

	return (
		<header className="header">
			<Link to="/" className="header__link">
				<img src={logo} alt="logo icon" className="header__link-logo" />
				<h1>My music</h1>
			</Link>
			{user.image && (
				<img
					src={user.image}
					alt="Profile picture"
					className="header__profilePicture"
				/>
			)}
		</header>
	);
}

export default Header;
