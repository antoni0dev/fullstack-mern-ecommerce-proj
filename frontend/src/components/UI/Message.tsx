import { FC } from 'react';
import { Alert, AlertProps } from 'react-bootstrap';

interface Props {
  variant?: AlertProps['variant'];
  children: React.ReactNode;
}

const Message: FC<Props> = ({ variant = 'info', children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
