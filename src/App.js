import './App.scss';
import MyComponent from './components/LearnReact/MyComponent';
import Header from './Header/Header'
import { Outlet, Link } from "react-router-dom";


const App = () => {
  // const count = useSelector(state => state.counter.count);
  // const dispatch = useDispatch();

  // return (
  //   <div className="App">
  //     <header className="App-header">

  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <div>Count = {count}</div>
  //       <button onClick={() => dispatch(increaseCounter())}>Increase</button>
  //       <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
  //     </header>
  //   </div>
  // );
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
