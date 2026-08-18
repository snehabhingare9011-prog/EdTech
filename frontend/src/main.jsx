import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import "./index.css"
import {Toaster} from "react-hot-toast"
import {store} from "./redux/store";
import {Provider} from "react-redux";
import Loader from "../src/components/common/Loader";



ReactDOM.createRoot(document.getElementById("root")).render(

  <Provider store={store}>

    <BrowserRouter>
      <App />   
      <Toaster/>
    </BrowserRouter>

  </Provider> 

  // <Loader/>
  
  
  
);