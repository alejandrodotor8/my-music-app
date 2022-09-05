import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { Props } from '../shared/types';

function ProtectedRoute({ children }: Props): JSX.Element {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) {
		return <Navigate to="/signin"></Navigate>;
	}
	return <>{children}</>;
}

export { ProtectedRoute };
