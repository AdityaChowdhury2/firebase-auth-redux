import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/routes.jsx';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<Toaster position="top-right" />
			<RouterProvider router={routes} />
		</Provider>
	</React.StrictMode>
);
