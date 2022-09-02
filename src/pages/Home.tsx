import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const [token, setToken] = useState(localStorage.getItem('token_spotify'));
	const navigate = useNavigate();

	useEffect(() => {
		setToken(localStorage.getItem('token_spotify'));
		if (!token) navigate('/signin');
	}, []);

	const logout = (): void => {
		setToken(null);
		localStorage.removeItem('token_spotify');
		navigate('/signin');
	};
	console.log(token);
	return (
		<div className="App">
			<h1>Home Page</h1>
			{token ? <button onClick={logout}>Log out</button> : null}
		</div>
	);
}

export default Home;
