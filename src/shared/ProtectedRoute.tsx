import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { Props } from '../shared/types';

function ProtectedRoute({ children }: Props): ReactNode {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) {
		return <Navigate to="/signin"></Navigate>;
	}
	return children;
}

export { ProtectedRoute };
