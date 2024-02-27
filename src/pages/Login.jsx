import { Link, useNavigate, useLocation } from 'react-router-dom';
import SocialLogin from '../components/SocialLogin';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Login = () => {
	const { user, loading } = useSelector(state => state.auth);
	const navigate = useNavigate();
	const location = useLocation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = data => {
		console.log(data);
	};

	if (user) return navigate(location.state || '/', { replace: true });
	if (loading) return <h1 className="text-center mt-10">Loading...</h1>;

	return (
		<section className="h-full">
			<div className=" flex h-full items-center py-16">
				<main className="w-full max-w-md mx-auto p-6">
					<div className="mt-7  border border-gray-300 rounded-xl shadow-sm  ">
						<div className="p-4 sm:p-7">
							<div className="text-center">
								<h1 className="block text-2xl font-bold text-gray-800 ">
									Sign in
								</h1>
								<p className="mt-2 text-sm text-gray-600 ">
									Don&apos;t have an account yet?
									<Link
										className="text-blue-600 decoration-2 hover:underline font-medium "
										to="/register"
									>
										Sign up here
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
											<label htmlFor="email" className="block text-sm mb-2 ">
												Email address
											</label>
											<div className="relative">
												<input
													type="email"
													{...register('email')}
													className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
													required
													aria-describedby="email-error"
												/>
												<ErrorMessage
													errors={errors}
													name="email"
													render={({ message }) => (
														<p className="hidden text-xs text-red-600 mt-2">
															{message}
														</p>
													)}
												/>
											</div>
										</div>
										{/* <!-- End Form Group --> */}
										{/*               <!-- Form Group --> */}
										<div>
											<div className="flex justify-between items-center">
												<label
													htmlFor="password"
													className="block text-sm mb-2 "
												>
													Password
												</label>
											</div>
											<div className="relative">
												<input
													type="password"
													{...register('password')}
													className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
													required
												/>
												<ErrorMessage
													errors={errors}
													name="password"
													render={({ message }) => (
														<p className="hidden text-xs text-red-600 mt-2">
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
											Sign in
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

export default Login;
