import { useState, useEffect } from 'react';
import { useAuth } from '../Hooks/useAuth';

function Home() {
	const [token, setToken] = useState(localStorage.getItem('token_spotify'));
	const { login } = useAuth();

	useEffect(() => {
		if (token) login(token);
	}, []);

	return (
		<div className="Home">
			<p>Home Page</p>
		</div>
	);
}

export default Home;
