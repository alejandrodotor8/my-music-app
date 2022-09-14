import { BrowserRouter } from 'react-router-dom';
import Header from './components/organisms/Header/Header';
import Footer from './components/organisms/Footer/Footer';
import Router from './router/Router';
import './styles/index.scss';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Router />
			<Footer />
		</BrowserRouter>
	);
}

export default App;
