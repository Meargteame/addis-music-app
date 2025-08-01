import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { store } from './app/store';

// Initialize MirageJS mock server in development (DISABLED - Using real backend)
// Enable this if you want to use mock data instead of the Express backend
if (process.env.REACT_APP_USE_MOCK_SERVER === 'true' && process.env.NODE_ENV === 'development') {
  const { makeServer } = require('./server');
  makeServer({ environment: 'development' });
  console.log('🎭 MirageJS mock server initialized');
} else {
  console.log('🔗 Using Express.js backend via proxy');
}

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyles />
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  </Provider>
);
