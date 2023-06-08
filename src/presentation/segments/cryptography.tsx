import { Appear, Text, Slide, Notes, Image } from "spectacle";
import { CenterOnSlide,  LargeWaveText,  RawText,  References, WaveText } from "../../templates/styles";
import { ekgTheme } from "../../settings";
import { penguinA } from "../../penguins";

import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine, { DiagramModel, DefaultNodeModel, DefaultLinkModel, DefaultLabelModel } from '@projectstorm/react-diagrams';


const Fun = () => {
	const engine = createEngine({
      /* i dislike zoom for this initial graphic - this could happen accidental */
		registerDefaultPanAndZoomCanvasAction: false,
      registerDefaultZoomCanvasAction: false
	});

   // node 1
   const node1 = new DefaultNodeModel({
      name: 'Node 1'
   });
   node1.setPosition(100, 100);
   let port1 = node1.addOutPort('Out');
   port1.setLocked(true);

   // node 2
   const node2 = new DefaultNodeModel({
      name: 'Node 1'
   });
   node2.setPosition(600, 100);
   let port2 = node2.addInPort('In');

   port2.setLocked(true);

   const link = port1.link<DefaultLinkModel>(port2);
   link.setLocked(true);

   const model = new DiagramModel();
   model.addAll(node1, node2, link);
   engine.setModel(model);

	return (
      <div style={{ height:"50%", marginTop: '12.5%' }}>
		   <CanvasWidget engine={engine} className="diagram-canvas"/>
      </div>
	);
};

export const Cryptography: React.FC = () => {
   return (<Slide>
      <Fun />
      {/* <Image src={penguinA} /> */}
    <Notes>
      TODO
   </Notes>
   </Slide>)
}