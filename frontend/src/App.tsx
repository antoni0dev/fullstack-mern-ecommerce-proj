import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import { Outlet } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';

const App = () => {
  return (
    <AuthWrapper>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </AuthWrapper>
  );
};

export default App;
