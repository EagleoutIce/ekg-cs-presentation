import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "beautiful-react-diagrams/styles.css";
import reportWebVitals from "./reportWebVitals";
import CurrentDeck from "./presentation";

function App() {
  return (<CurrentDeck />);
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
