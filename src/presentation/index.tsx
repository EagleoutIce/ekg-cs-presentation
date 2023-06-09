import { Deck } from "spectacle";
import { ekgTheme } from "../settings";
import { template } from "../templates/template";
import { transition } from "../templates/transition";
import { Intro } from "./segments/cve-intro";
import TitleSlide from "../templates/title";
import { Cryptography } from "./segments/cryptography";

// TODO: overview?
const Presentation = () => {

  setTimeout(() => {
    const deck = document.getElementById("root")?.getElementsByTagName("div")[0];
    if(!deck)
      return;
    // somehow this inject (which spectacle does not allow) fixes some of the alignment problems...
    deck.style.overflow = "visible";
  }, 100);
  return (
    <Deck theme={ekgTheme} template={template} transition={transition}>
      <TitleSlide title={"Von Physik, Informatik und der Welt"} />
      <Intro />
      <Cryptography />
    </Deck>
  );
};
export default Presentation;
