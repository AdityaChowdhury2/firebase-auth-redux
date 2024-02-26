import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { authLoading, login, logout } from '../redux/features/auth/authSlice';
import auth from '../firebase/firebase.config';
const MainLayout = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authLoading());
		const subscribe = onAuthStateChanged(auth, user => {
			if (user) {
				dispatch(login({ email: user.email, name: user.displayName }));
			} else {
				dispatch(logout());
			}
		});
		return () => subscribe();
	}, []);
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	);
};

export default MainLayout;
