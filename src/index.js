import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <Layout/>
    {/* </React.StrictMode> */}
  </Provider>
);
reportWebVitals();
