import { createContext, useContext, useState } from 'react';
import type { IPropsChildren } from '../shared/types';

interface IAuth {
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<IAuth>(null as any);

export const AuthProvider = ({ children }: IPropsChildren) => {
	const auth = useProviderAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProviderAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = (token: string) => {
		localStorage.setItem('token', token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
	};
	return { isAuthenticated, login, logout };
}
