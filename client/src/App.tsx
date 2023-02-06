import { BrowserRouter, Navigate, Outlet, useRoutes } from "react-router-dom";
import { useTypedSelector } from "./app/store";
import { authState } from "./features/auth/authSlice";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function Routes() {
  const { token } = useTypedSelector(authState);
  const isAuthenticated = Boolean(token);
  return useRoutes([
    {
      // public routes
      path: "/",
      element: isAuthenticated ? <Outlet /> : <Navigate to={"/sign-in"} />,
      children: [{ path: "/", element: <Dashboard /> }],
    },
    {
      path: "/",
      element: !isAuthenticated ? <Outlet /> : <Navigate to={"/"} />,
      children: [
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
      ],
    },
    {
      // public routes
      path: "*",
      element: <div>404</div>,
    },
  ]);
}

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes />
    </BrowserRouter>
  );
}

export default App;
