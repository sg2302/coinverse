import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter // to use links we need to use browser router
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store";
import 'antd/dist/antd';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>  {/* Wrap App with BrowserRouter */}
   <Provider store={store}>
     <App />
   </Provider>
    
  </Router>
);
