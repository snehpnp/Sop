import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./ThemeContext";
import { register } from "./Utils/Serviceworker";
import { PermissionProvider } from "./PermissionContext";

 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <PermissionProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </PermissionProvider>
  </ThemeProvider>
);
 
register();
