import React from "react";
import { createRoot } from "react-dom/client";
import "beautiful-react-diagrams/styles.css";
import PresentationDeck from "./presentation";


const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <PresentationDeck />
  </React.StrictMode>
);
