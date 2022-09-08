import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import type { IPropsChildren } from '../shared/types';

function ProtectedRoute({ children }: IPropsChildren): JSX.Element {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) {
		return <Navigate to="/signin"></Navigate>;
	}
	return <>{children}</>;
}

export default ProtectedRoute;
