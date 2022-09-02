import { useState } from 'react';

import { Route, Routes, Link } from 'react-router-dom';
import './styles/App.scss';
import Home from './pages/Home';
import SigIn from './pages/SignIn';

function App() {
	return (
		<div className="App">
			<h1>My Music App</h1>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<SigIn />} />
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
		</div>
	);
}

export default App;
