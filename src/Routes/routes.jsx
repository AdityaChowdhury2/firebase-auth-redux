import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <h1>Home</h1>,
			},
			{
				path: '/about',
				element: <h1>About</h1>,
			},
			{
				path: '/contact',
				element: <h1>Contact</h1>,
			},
			{
				path: '/login',
				element: <h1>Login</h1>,
			},
			{
				path: '/register',
				element: <h1>Register</h1>,
			},
		],
	},
]);
