import { useState, useEffect } from 'react';
import { ADMIN_ROUTES, PATHS, PUBLIC_PATHS } from '../lib/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectCart } from '../slices/cartSlice';

const useRedirect = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { shippingAddress, paymentMethod } = useSelector(selectCart);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirects unauthenticated users trying to access non-public routes to the login page
    if (!userInfo && !PUBLIC_PATHS.includes(location.pathname)) {
      navigate(PATHS.login, { replace: true });
    }

    // Redirects authenticated users trying to access public routes (like login) to the home page
    if (userInfo && PUBLIC_PATHS.includes(location.pathname)) {
      navigate(PATHS.root, { replace: true });
    }

    // Redirects authenticated users that are not admins to access admin routes
    if (
      userInfo &&
      !userInfo.isAdmin &&
      ADMIN_ROUTES.includes(location.pathname)
    ) {
      navigate(PATHS.root, { replace: true });
    }

    // Redirects users to payment page if they have already filled in the shipping address and are on the shipping page
    if (
      Object.keys(shippingAddress).length !== 0 &&
      location.pathname === PATHS.shipping
    ) {
      navigate(PATHS.payment);
    }

    if (location.pathname === PATHS.payment) {
      // Redirects users to the shipping page if they have not filled in the shipping address
      if (Object.keys(shippingAddress).length === 0) {
        navigate(PATHS.shipping, { replace: true });
      }

      // Redirects users to place order page if they have already selected a payment method
      if (paymentMethod) {
        navigate(PATHS.placeOrder);
      }
    }

    // Redirects users to the payment page from the place order page if they haven't selected a payment method
    if (!paymentMethod && location.pathname === PATHS.placeOrder) {
      navigate(PATHS.payment, { replace: true });
    }

    setIsLoading(false);
  }, [userInfo, location]);

  return isLoading;
};

export default useRedirect;
