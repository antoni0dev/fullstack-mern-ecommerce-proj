import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      variant='dark'
      style={{
        display: "block",
        margin: "auto",
      }}
    >
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
