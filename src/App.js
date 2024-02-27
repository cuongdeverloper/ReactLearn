import './App.scss';
import Header from './Header/Header'
import { Outlet, Link } from "react-router-dom";
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
