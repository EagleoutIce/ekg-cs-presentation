import React from "react";
import { Deck } from "spectacle";
import { ekgTheme } from "../settings";
import { BaseSlide, Title } from "../templates";
import deckSettings from "./deck.settings";
import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
import { template } from "../templates/template";
import { transition } from "../templates/transition";

const DiagramNode = () => (
  <div className="bg-white w-64 p-2 b-1 text-center rounded-xl">
    I'm a custom node
  </div>
);

// the diagram model
const diagramSchema = createSchema({
  nodes: [
    {
      id: "node-1",
      content: "Node 1",
      coordinates: [250, 60],
      render: DiagramNode,
    },
    { id: "node-2", content: "Node 2", coordinates: [100, 200] },
    { id: "node-3", content: "Node 3", coordinates: [250, 220] },
    { id: "node-4", content: "Node 4", coordinates: [400, 200] },
  ],
  links: [
    { input: "node-1", output: "node-2" },
    { input: "node-1", output: "node-3" },
    { input: "node-1", output: "node-4" },
  ],
});

const Presentation = () => {
  return (
    <Deck theme={ekgTheme} template={template} transition={transition}>
      <Title title={deckSettings.deckTitle} />
      <BaseSlide>

      </BaseSlide>
    </Deck>
  );
};
export default Presentation;
