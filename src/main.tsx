import ReactDOM from 'react-dom/client';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { AuthProvider } from '@/Hooks/useAuth';
import { PlayerProvider } from '@/Hooks/usePlayer';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<AuthProvider>
			<PlayerProvider>
				<App />
			</PlayerProvider>
		</AuthProvider>
	</Provider>
);
