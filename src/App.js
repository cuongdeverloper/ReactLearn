import './App.scss';
import MyComponent from './components/LearnReact/MyComponent';
import Header from './Header/Header'
import { Outlet, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <>
      <div className='app-container'>
        <div className='header-container'>
          <Header />
        </div>
        <Outlet />
      </div>
          
      <div className='learnReact-container'>
      </div>
    </>
  )
}

export default App;
