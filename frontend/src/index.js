import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {Provider} from 'react-redux';
import Store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <GoogleOAuthProvider clientId="1047913504264-et7r87us2n8r7l7vgf2hec7ht0oqtrhs.apps.googleusercontent.com  ">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
  </Provider>
  
);



reportWebVitals();
