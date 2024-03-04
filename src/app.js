import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import PrivateRoute from '_helpers/private-route';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from 'pages/dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter basename='/'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
