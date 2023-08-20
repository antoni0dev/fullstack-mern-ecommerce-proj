import { FC, PropsWithChildren } from 'react';
import useRedirect from './hooks/useRedirect';
import Loader from './components/Loader';

const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
  const isLoading = useRedirect();

  return isLoading ? <Loader /> : children;
};

export default AuthWrapper;
