import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ResultsContextProvider } from "./Contexts/ResultsContextProvider";
import "./global.css";

ReactDom.render(
  <ResultsContextProvider>
    <Router>
      <App />
    </Router>
  </ResultsContextProvider>,
  document.getElementById("root")
);
