import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

function Home() {
	const [token, setToken] = useState(localStorage.getItem('token_spotify'));
	const { logout, login, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		//setToken(localStorage.getItem('token_spotify'));
		if (token) login(token);
	}, []);

	const handleClick = (): void => {
		//setToken(null);
		//localStorage.removeItem('token_spotify');
		logout();
		navigate('/signin');
	};

	return (
		<div className="App">
			<h1>Home Page</h1>
			{isAuthenticated ? (
				<button onClick={handleClick}>Log out</button>
			) : null}
		</div>
	);
}

export default Home;
