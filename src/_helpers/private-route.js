import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

export const PrivateRoute = ({ children }) => {
  const [cookies] = useCookies(['jwt']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }
  }, [cookies.token, navigate]);

  return children;
};

export default PrivateRoute;
