import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import { PATHS } from "./constants";
import RegisterPage from "../pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATHS.product,
        element: <ProductPage />,
      },
      {
        path: PATHS.cart,
        element: <CartPage />,
      },
      {
        path: PATHS.login,
        element: <LoginPage />,
      },
      {
        path: PATHS.register,
        element: <RegisterPage />,
      },
    ],
  },
]);
