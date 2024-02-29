import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { graphQLClient } from 'lib/graphql/queries';
import { getUserInformation } from 'lib/graphql/queries';
export const PrivateRoute = ({ children }) => {
  const [cookies, setCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }

    graphQLClient.request(getUserInformation).catch(() => {
      setCookie('token', '', { expires: new Date(0) });
      navigate('/login');
    });
  }, [cookies.token, navigate, setCookie]);

  return children;
};

export default PrivateRoute;
