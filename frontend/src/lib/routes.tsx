import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./constants";
import App from "../App";
import {
  HomePage,
  ProductPage,
  CartPage,
  LoginPage,
  RegisterPage,
  ShippingPage,
  OrderPage,
  PaymentPage,
  PlaceOrderPage,
  ProfilePage,
} from "../pages/index";

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

      {
        path: PATHS.shipping,
        element: <ShippingPage />,
      },
      {
        path: PATHS.payment,
        element: <PaymentPage />,
      },
      {
        path: PATHS.placeOrder,
        element: <PlaceOrderPage />,
      },
      {
        path: PATHS.order,
        element: <OrderPage />,
      },
      {
        path: PATHS.profile,
        element: <ProfilePage />,
      },
    ],
  },
]);
