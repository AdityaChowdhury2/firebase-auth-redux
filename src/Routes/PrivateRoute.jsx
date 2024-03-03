import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';

const PrivateRoute = ({ children }) => {
	const { user, loading } = useSelector(state => state.auth);
	const location = useLocation();
	console.log(user);
	if (loading) {
		return (
			<h1 className=" flex justify-center mt-10">
				<TbFidgetSpinner size={30} className="animate-spin" />
			</h1>
		);
	}
	if (!user)
		return (
			<Navigate to={'/login'} state={location.state || location.pathname} />
		);
	else return <>{children}</>;
};

PrivateRoute.propTypes = {
	children: PropTypes.node,
};

export default PrivateRoute;
