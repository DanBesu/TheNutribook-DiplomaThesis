import AppRouter from './AppRouter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <AppRouter/>
    </>
  );
}

export default App;
