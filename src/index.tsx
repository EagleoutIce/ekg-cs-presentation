import React from "react";
import { createRoot } from "react-dom/client";
import "./templates/main.css"
import PresentationDeck from "./presentation";


const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <PresentationDeck />
  </React.StrictMode>
);
