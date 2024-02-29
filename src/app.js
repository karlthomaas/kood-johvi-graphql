import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoute from '_helpers/private-route';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from 'pages/dashboard';
// https://medium.com/@kthamodaran/react-8-best-practices-folder-structure-5dbda48a69e
// https://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename='kood-johvi-graphql'>
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
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
