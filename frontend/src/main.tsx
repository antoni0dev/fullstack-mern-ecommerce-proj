import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./lib/routes";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./store";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import { SCRIPT_PROVIDER_OPTIONS } from "./lib/constants";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider
        deferLoading={true}
        options={SCRIPT_PROVIDER_OPTIONS}
      >
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
