import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "beautiful-react-diagrams/styles.css";
import CurrentDeck from "./presentation";

function App() {
  return (<CurrentDeck />);
}

const root = createRoot(document.body);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
