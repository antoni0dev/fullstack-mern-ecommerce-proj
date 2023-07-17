import { FC } from "react";
import { Alert } from "react-bootstrap";

interface Props {
  variant?: string;
  children: React.ReactNode;
}

const Message: FC<Props> = ({ variant = "info", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
