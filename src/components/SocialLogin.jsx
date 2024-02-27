import { useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import {
	authLoading,
	login,
	loginError,
} from '../redux/features/auth/authSlice';
const googleProvider = new GoogleAuthProvider();
const SocialLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const handleGoogleSignIn = async () => {
		try {
			dispatch(authLoading());
			const response = await signInWithPopup(auth, googleProvider);
			const user = response.user;
			console.log(user);
			dispatch(login({ email: user.email, name: user.displayName }));
			navigate(location.state || '/', { replace: true });
		} catch (error) {
			dispatch(loginError(error.message));
			console.log(error);
		}
	};
	return (
		<button
			onClick={handleGoogleSignIn}
			type="button"
			className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
		>
			<FcGoogle size={20} />
			Sign up with Google
		</button>
	);
};

export default SocialLogin;
