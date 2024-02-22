import './App.scss';
import Header from './Header/Header'
import { Outlet, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import logo from './logo.svg';
const App = () => {
  // const count = useSelector(state => state.counter.count);
  // const dispatch = useDispatch();
  return (
    <>
      <div className='app-container'>
        <div className='header-container'>
          <Header />
          {/* <div className="App">
            <header className="App-header">
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <div>Count = {count}</div>
              <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
            </header>
          </div> */}
        </div>
        <Outlet />
      </div>

      <div className='learnReact-container'>
      </div>
    </>
  )
}

export default App;
