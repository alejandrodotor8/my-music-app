import { BrowserRouter } from 'react-router-dom';
import Header from './components/organisms/Header/Header';
import Footer from './components/organisms/Footer/Footer';
import Router from './router/Router';
import Player from '@atoms/Player/Player';
import './styles/index.scss';

import { useAppSelector } from './Hooks/reduxHooks';
import { useAuth } from './Hooks/useAuth';

function App() {
	const { isAuthenticated } = useAuth();
	const user = useAppSelector((state) => state.user.value);

	return (
		<BrowserRouter>
			<Header user={user} isAuthenticated={isAuthenticated} />
			<Router />
			<Footer />
			<Player />
		</BrowserRouter>
	);
}

export default App;
