import React from "react";
import { Deck } from "spectacle";
import { ekgTheme } from "../settings";
import { template } from "../templates/template";
import { transition } from "../templates/transition";
import { Intro } from "./segments/cve-intro";
import TitleSlide from "../templates/title";
import { Cryptography } from "./segments/cryptography";

// TODO: overview?
const Presentation = () => {
  return (
    <Deck theme={ekgTheme} template={template} transition={transition}>
      <TitleSlide title={"Von Physik, Informatik und der Welt"} />
      <Intro />
      <Cryptography />
    </Deck>
  );
};
export default Presentation;
