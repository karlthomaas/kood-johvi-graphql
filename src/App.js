import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "_helpers/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "pages/Dashboard";

// https://medium.com/@kthamodaran/react-8-best-practices-folder-structure-5dbda48a69e
// https://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
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
