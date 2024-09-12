import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/AppRouter.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';
import { UserProvider } from './contexts/UserContext.jsx';
import './index.css';
import { GlobalStyles } from '@mui/material';
import { globalStyles } from './styles/globalStyles.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<UserProvider>
		<Provider store={store}>
			<GlobalStyles styles={globalStyles} />
			<AppRouter />
		</Provider>
	</UserProvider>	
);
