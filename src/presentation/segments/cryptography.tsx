import { Appear, Text, Slide, Notes, Image, Stepper } from "spectacle";
import { CenterOnSlide,  LargeWaveText,  RawText,  References, WaveText } from "../../templates/styles";
import ReactFlow, {
   MiniMap,
   Controls,
   Background,
   useNodesState,
   useEdgesState,
   addEdge,
   Handle,
   Position,
 } from 'reactflow';

import 'reactflow/dist/style.css';
import { useMemo } from "react";
import { penguinA, penguinB } from "../../penguins";
import { ekgTheme } from "../../settings";


interface ImageNodeData {
   type: 'in' | 'out' | 'both'
   source: string
   label: string
}

// TODO: collision detection
function MainImageNode(input: { data: ImageNodeData }) {
   return (
     <>
       { input.data.type !== 'out' && <Handle type="target" position={Position.Left} isConnectableStart={false} isConnectableEnd={false} isConnectable={false} style={{ marginRight: '10px' }} />}
       <img src={input.data.source} style={{ height: 100 }} />
       <div style={{textAlign: 'center', fontFamily: ekgTheme.fonts.header, marginTop: '5px' }}>{input.data.label}</div>
       { input.data.type !== 'in' && <Handle type="source" position={Position.Right} isConnectableStart={false} isConnectableEnd={false} isConnectable={false} style={{ marginLeft: '10px' }} /> }
     </>
   );
 }

 const initialNodes = [
   { id: '1', type: 'image', position: { x: 0, y: 0 }, data: { source: penguinA, type: 'out', label: "Alice" } },
   { id: '2', type: 'image', position: { x: 500, y: 0 }, data: { source: penguinB, type: 'in', label: "Bob" } },
 ];

 const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

 const defaultEdgeOptions = {
   animated: true
 };
 const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const PenguinsCommunicate: React.FC = () => {
   const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges);

   const nodeTypes = useMemo(() => ({ image: MainImageNode }), []);

   return (
     <ReactFlow
       nodeTypes={nodeTypes}
       nodes={nodes}
       edges={edges}
       onNodesChange={onNodesChange}
       onEdgesChange={onEdgesChange}
       defaultEdgeOptions={defaultEdgeOptions}
       snapGrid={[25, 25]}
       defaultViewport={defaultViewport}
       snapToGrid={true}
       fitView
       minZoom={0.5}
       maxZoom={2}
       edgesUpdatable={false}
       nodesConnectable={false}
       nodesDraggable={true}
       edgesFocusable={false}
       proOptions={{ hideAttribution: true }}
       style={{
         padding: 0,
         margin: 0
       }}
     >
     </ReactFlow>
   );
}

export const Cryptography: React.FC = () => {

   return (<Slide padding={'0px'} >
      <CenterOnSlide>
      <div style={{ width: "100%", height: "100%" }}>
         <Appear>
               <PenguinsCommunicate />
         </Appear>
      </div>
      </CenterOnSlide>
    <Notes>
      TODO
   </Notes>
   </Slide>)
}