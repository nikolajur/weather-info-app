import React from "react";
import ReactDOM from "react-dom/client";
import LocationProvider from "./store/LocationProvider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LocationProvider>
      <App />
    </LocationProvider>
  </React.StrictMode>
);
