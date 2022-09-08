import { createContext, useContext, useState } from 'react';
import type { IPropsChildren } from '../shared/types';

interface IAuth {
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<IAuth>(null);

export const AuthProvider = ({ children }: IPropsChildren) => {
	const auth = useProviderAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProviderAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = (token: string) => {
		localStorage.setItem('token_spotify', token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem('token_spotify');
		setIsAuthenticated(false);
	};
	return { isAuthenticated, login, logout };
}
