import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export const PrivateRoute = ({ children }) => {
  const [cookies] = useCookies(["jwt"]);
  const navigate = useNavigate();
  console.log(cookies.token);

  useEffect(() => {
    if (!cookies.token) {
      console.log("No token");
      navigate("/login");
    }
  }, [cookies.token, navigate]);

  return children;
};

export default PrivateRoute;
