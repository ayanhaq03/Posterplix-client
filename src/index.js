import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>

        <HashRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                <Auth0Provider
    domain="dev-3zgzrjmyngrdh3ew.us.auth0.com"
    clientId="tD3Lqoby5GcqdoIoTAMe4HdQhpSZGsRe"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
                  
                </PersistGate>
            </Provider>
        </HashRouter>
    </React.StrictMode>
);
