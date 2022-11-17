import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PrivacyPolicy from "./PrivacyPolicy";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App/>}></Route>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
