import SignUp from "./pages/SignUp";

import { BrowserRouter, useRoutes } from "react-router-dom";
import SignIn from "./pages/SignIn";

function Routes() {
  return useRoutes([
    // {
    //   // public routes
    //   path: "/",
    //   element: <DashboardLayout />,
    //   children: [
    //     { path: "/", element: <Dashboard /> },
    //     { path: "/product-sales", element: <ProductSales /> },
    //     { path: "/product-sales/:productId", element: <ProductSale /> },
    //     { path: "/test", element: <TestConnection /> },
    //   ],
    // },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
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
