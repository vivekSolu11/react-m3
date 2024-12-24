import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material';

import { store, persistor } from 'store/store';
import { CustomSnackbar } from './component';
import theme from './theme';
import App from './App.jsx';

import './index.css';

// Create a Query Client
const queryClient = new QueryClient();

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<QueryClientProvider client={queryClient}>
						<App />
						<CustomSnackbar />
					</QueryClientProvider>
				</PersistGate>
			</Provider>
		</ThemeProvider>
	</BrowserRouter>
	// </React.StrictMode>,
);
