import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const { user, loading } = useSelector(state => state.auth);
	const location = useLocation();

	if (loading) {
		return <h1 className="text-center mt-10">Loading...</h1>;
	}
	if (!user) {
		return (
			<Navigate to={'/login'} state={location.state || location.pathname} />
		);
	}

	return <>{children}</>;
};

PrivateRoute.propTypes = {
	children: PropTypes.node,
};

export default PrivateRoute;
