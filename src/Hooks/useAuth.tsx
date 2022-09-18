import { createContext, useContext, useState } from 'react';
import { SpotifyApi } from '../services/api-spotify';
import type { IPropsChildren } from '../shared/types';

interface IAuth {
	isAuthenticated: boolean;
	login: (token: string) => SpotifyApi;
	logout: () => void;
	api: SpotifyApi;
}

const AuthContext = createContext<IAuth>(null as any);

export const AuthProvider = ({ children }: IPropsChildren) => {
	const auth = useProviderAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProviderAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [api, setApi] = useState<SpotifyApi>({} as SpotifyApi);

	const login = (token: string): SpotifyApi => {
		localStorage.setItem('token', token);
		const api = new SpotifyApi(token);
		setApi(api);
		setIsAuthenticated(true);
		return api;
	};

	const logout = () => {
		localStorage.removeItem('token');
		setApi({} as SpotifyApi);
		setIsAuthenticated(false);
	};
	return { isAuthenticated, login, logout, api };
}
