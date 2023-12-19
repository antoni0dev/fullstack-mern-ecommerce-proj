import { createBrowserRouter } from 'react-router-dom';
import { PATHS } from './constants';
import App from '../App';
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
  OrderListPage,
  UserListPage,
  UserEditPage,
  ProductListPage,
  ProductEditPage,
} from '../pages/index';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: PATHS.root,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: PATHS.products,
        element: <HomePage />,
      },
      {
        path: PATHS.search,
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
      {
        path: PATHS.orderList,
        element: <OrderListPage />,
      },
      {
        path: PATHS.productList,
        element: <ProductListPage />,
      },
      {
        path: PATHS.userList,
        element: <UserListPage />,
      },
      {
        path: PATHS.editProduct,
        element: <ProductEditPage />,
      },
      {
        path: PATHS.editUser,
        element: <UserEditPage />,
      },
    ],
  },
]);
