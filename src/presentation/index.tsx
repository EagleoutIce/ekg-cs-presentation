import React from "react";
import { Deck } from "spectacle";
import { ekgTheme } from "../settings";
import { template } from "../templates/template";
import { transition } from "../templates/transition";
import { Intro } from "./segments/cve-intro";
import TitleSlide from "../templates/title";

const DiagramNode = () => (
  <div className="bg-white w-64 p-2 b-1 text-center rounded-xl">
    I'm a custom node
  </div>
);

const Presentation = () => {
  return (
    <Deck theme={ekgTheme} template={template} transition={transition}>
      <TitleSlide title={"Von Physik, Informatik und der Welt"} />
      <Intro />
    </Deck>
  );
};
export default Presentation;
