import { Link, useNavigate, useLocation } from 'react-router-dom';
import SocialLogin from '../components/SocialLogin';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import {
	authLoading,
	login,
	loginError,
} from '../redux/features/auth/authSlice';

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const { user, loading } = useSelector(state => state.auth);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const onSubmit = async data => {
		try {
			dispatch(authLoading());
			const response = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			console.log(response.user);
			dispatch(
				login({ email: response.user.email, name: response.user.displayName })
			);
		} catch (error) {
			dispatch(loginError(error.message));
			console.log(error);
		}
	};
	if (user) return navigate(location.state || '/', { replace: true });
	if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
	return (
		<section className="h-full ">
			<div className="flex h-full items-center py-16">
				<main className="w-full max-w-md mx-auto p-6">
					<div className="mt-7border border-gray-300 rounded-xl shadow-sm ">
						<div className="p-4 sm:p-7">
							<div className="text-center">
								<h1 className="block text-2xl font-bold text-gray-800">
									Sign up
								</h1>
								<p className="mt-2 text-sm text-gray-600 ">
									Already have an account?
									<Link
										className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 "
										to="/login"
									>
										Sign in here
									</Link>
								</p>
							</div>

							<div className="mt-5">
								<SocialLogin />

								<div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 ">
									Or
								</div>

								{/* <!-- Form --> */}
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="grid gap-y-4">
										{/* <!-- Form Group --> */}
										<div>
											<label htmlFor="email" className="block text-sm mb-2">
												Email address
											</label>
											<div className="relative">
												<input
													id="email"
													{...register('email')}
													className="py-3 px-4 block w-full  ring-1 ring-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
													required
												/>
												<ErrorMessage
													errors={errors}
													name="email"
													render={({ message }) => (
														<p className="text-xs text-red-600 mt-2">
															{message}
														</p>
													)}
												/>
											</div>
										</div>
										{/* <!-- End Form Group --> */}

										{/* <!-- Form Group --> */}
										<div>
											<label htmlFor="password" className="block text-sm mb-2">
												Password
											</label>
											<div className="relative">
												<input
													type="password"
													id="password"
													{...register('password')}
													className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
													required
												/>
												<ErrorMessage
													errors={errors}
													name="password"
													render={({ message }) => (
														<p className="text-xs text-red-600 mt-2">
															{message}
														</p>
													)}
												/>
											</div>
										</div>
										{/* <!-- End Form Group --> */}

										{/* <!-- Form Group --> */}
										<div>
											<label
												htmlFor="confirm-password"
												className="block text-sm mb-2 "
											>
												Confirm Password
											</label>
											<div className="relative">
												<input
													type="password"
													{...register('confirmPassword')}
													className="py-3 px-4 block w-full  ring-1 ring-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
													required
												/>
												<ErrorMessage
													errors={errors}
													name="confirmPassword"
													render={({ message }) => (
														<p className="text-xs text-red-600 mt-2">
															{message}
														</p>
													)}
												/>
											</div>
										</div>
										{/* <!-- End Form Group --> */}

										<button
											type="submit"
											className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none "
										>
											Sign up
										</button>
									</div>
								</form>
								{/* <!-- End Form --> */}
							</div>
						</div>
					</div>
				</main>
			</div>
		</section>
	);
};

export default Register;
