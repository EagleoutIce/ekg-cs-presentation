import ReactFlow, {
   useNodesState,
   useEdgesState,
   Handle,
   Position,
   Panel,
   Controls,
 } from 'reactflow';

import 'reactflow/dist/style.css';
import React, { useEffect, useMemo, useRef, useState } from "react";
import { penguinA, penguinB, penguinE } from "../../images";
import { ekgTheme } from "../../settings";
import * as d3 from 'd3';

interface ImageNodeData {
   type: 'in' | 'out' | 'both'
   source: string
   label: string,
   addon?: (img: HTMLImageElement | null) => void
}

// TODO: collision detection
function MainImageNode(input: { data: ImageNodeData }) {
   const ref = useRef<HTMLImageElement>(null);
   if(input.data.addon) {
      const update = () => { input.data.addon!(ref.current) }
      setInterval(update, 100)
   }

   useEffect(() => input.data.addon?.(ref.current), []);
   return (
     <>
       { input.data.type !== 'out' && <Handle type="target" position={Position.Left} isConnectableStart={false} isConnectableEnd={false} isConnectable={false} style={{ marginRight: '10px' }} />}
       <img src={input.data.source} style={{ height: 100 }} ref={ref} />
       <div style={{textAlign: 'center', fontFamily: ekgTheme.fonts.header, marginTop: '5px' }}>{input.data.label}</div>
       { input.data.type !== 'in' && <Handle type="source" position={Position.Right} isConnectableStart={false} isConnectableEnd={false} isConnectable={false} style={{ marginLeft: '15px' }} /> }
     </>
   );
 }

 const initialNodes = [
   { id: '1', type: 'image', position: { x: 0, y: 20 }, data: { source: penguinA, type: 'out', label: "Alice" } },
   { id: '2', type: 'image', position: { x: 400, y: -20 }, data: { source: penguinB, type: 'in', label: "Bob" } },
 ];

 const initialEdges = [{ id: 'e1-2', source: '1', target: '2', label: ' ' }];



 const defaultEdgeOptions = {
   animated: true
 };
 const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const eveNode = {
   id: '3',
   type: 'image',
   position: { x: 200, y: 100 },
   data: {
      source: penguinE,
      type: 'both',
      label: "Eve",
      addon: addonForEve
   }
}

interface PenguinData {
   eve: boolean
   interactable: boolean
}

const isMobileScreen = () => {
   // TODO:
   return window.innerWidth <= 768;
}

export const PenguinsCommunicate: React.FC<PenguinData> = (props: PenguinData) => {
   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges);
   const [interactable, setInteractable ] = useState(props.interactable)
   const isMobile = isMobileScreen()

   if(isMobile) {
      setInteractable(false)
   }

   const nodeTypes = useMemo(() => ({ image: MainImageNode }), []);
   const [eveAdded, setEveAdded] = useState(false)

   const addEve = () => {
      setEveAdded(true)
      setNodes((prevNodes) =>
         prevNodes.concat(eveNode)
      )
   }

   if(props.eve && !eveAdded) {
         addEve()
   }

   return (
     <ReactFlow
       nodeTypes={nodeTypes}
       nodes={nodes}
       edges={edges}
       onNodesChange={onNodesChange}
       onEdgesChange={onEdgesChange}
       defaultEdgeOptions={defaultEdgeOptions}
       defaultViewport={defaultViewport}
       snapToGrid={false}
       fitView={true}
       /** if it is not interactable set fixed*/
       minZoom={interactable ? 0.65 : undefined}
       maxZoom={interactable ? 1.75 : undefined}
       edgesUpdatable={false}
       nodesConnectable={false}
       nodesDraggable={interactable}
       zoomOnScroll={interactable}
       zoomOnPinch={interactable}
       panOnDrag={interactable}
       panOnScroll={false}
       autoPanOnNodeDrag={false}
       autoPanOnConnect={false}
       disableKeyboardA11y={!interactable}
       edgesFocusable={false}
       proOptions={{ hideAttribution: true }}
       style={{
         padding: 0,
         margin: 0
       }}
     >
    <Panel position="bottom-center">
      {!eveAdded && <button className="basic-control" onClick={addEve}>
        Add Eve
      </button>}
    </Panel>
       { props.interactable &&
         <Controls showZoom={false} showInteractive={true} showFitView={true} onInteractiveChange={status => setInteractable(status)} className={isMobile ? "huge-controls" : undefined}/>
       }
     </ReactFlow>
   );
}

function addonForEve(img: HTMLImageElement | null) {
   if(!img) return;

   const svg: d3.Selection<SVGSVGElement, unknown, null, any> = d3.select(img.parentElement?.parentElement?.parentElement ?? null).select('svg.react-flow__edges.react-flow__container');
   const middle: d3.Selection<SVGElement, unknown, null, any> = svg.select('.react-flow__edge-textwrapper');

   middle.attr('visibility', 'visible');
   middle.select('#eve-mark').remove();
   const ringContainer = middle.append('g')
      .attr('id', 'eve-mark');
   ringContainer.append('text')
      .attr('pointer-events', 'none')
      .attr('x', 13)
      .attr('y', 18)
      .style('font-family', ekgTheme.fonts.header)
      .style('font-size', '11px')
      .text('Abfangen...');
   const pulse = ringContainer
      .append('circle')
      .attr('fill', 'none')
      .attr('r', '0')
      .attr('opacity', '.7')
      .attr('stroke', 'darkred')
      .attr('stroke-width', '2');
   // based on https://codepen.io/shaneparsons/pen/MpgEma
   pulse.append('animate')
      .attr('attributeName', 'r')
      .attr('from', '6')
      .attr('to', '15')
      .attr('dur', '1.5s')
      .attr('repeatCount', 'indefinite')
      .attr('begin', '0s');
   pulse.append('animate')
      .attr('attributeName', 'opacity')
      .attr('from', '.7')
      .attr('to', '0')
      .attr('dur', '1.5s')
      .attr('repeatCount', 'indefinite')
      .attr('begin', '0s');

   ringContainer.append('circle')
      .attr('r', 6)
      .attr('opacity', '.7')
      .attr('fill', 'darkred');
}
