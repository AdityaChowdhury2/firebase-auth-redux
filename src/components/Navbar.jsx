import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const navMenus = (
	<>
		<NavLink
			className={({ isActive }) =>
				isActive ? 'font-medium text-blue-500 ' : 'font-medium'
			}
			to={'/'}
			aria-current="page"
		>
			Home
		</NavLink>
		<NavLink
			className={({ isActive }) =>
				isActive ? 'font-medium text-blue-500 ' : 'font-medium'
			}
			to={'/about'}
		>
			About
		</NavLink>
		<NavLink
			className={({ isActive }) =>
				isActive ? 'font-medium text-blue-500 ' : 'font-medium'
			}
			to={'/contact'}
		>
			Contact
		</NavLink>
	</>
);
const Navbar = () => {
	const { user } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const handleLogout = async () => {
		try {
			dispatch(logout());
			await signOut(auth);
			console.log('user logged out');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 ">
			<nav
				className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between"
				aria-label="Global"
			>
				<a className="sm:order-1 flex-none text-xl font-semibold " href="#">
					Brand
				</a>
				<div className="sm:order-3 flex items-center gap-x-2">
					<button
						type="button"
						className="sm:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
						data-hs-collapse="#navbar-alignment"
						aria-controls="navbar-alignment"
						aria-label="Toggle navigation"
					>
						<svg
							className="hs-collapse-open:hidden flex-shrink-0 size-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="3" x2="21" y1="6" y2="6" />
							<line x1="3" x2="21" y1="12" y2="12" />
							<line x1="3" x2="21" y1="18" y2="18" />
						</svg>
						<svg
							className="hs-collapse-open:block hidden flex-shrink-0 size-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					</button>

					{user ? (
						<>
							<button
								onClick={handleLogout}
								type="button"
								className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
							>
								Logout
							</button>
						</>
					) : (
						<Link to={'/login'}>
							<button
								type="button"
								className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
							>
								Login
							</button>
						</Link>
					)}
				</div>
				<div
					id="navbar-alignment"
					className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
				>
					<div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
						{navMenus}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
