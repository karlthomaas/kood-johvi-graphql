import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-full w-full">
      <h1>Home</h1>
      <p>Welcome to the Home page</p>
      <Link to="/login">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}
