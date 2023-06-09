import { Appear, Text, Slide, Notes, Image, Stepper, ListItem, UnorderedList, Heading } from "spectacle";
import { CenterOnSlide,  LargeWaveText,  RawText,  References, WaveText } from "../../templates/styles";
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
import { penguinA, penguinB, penguinE } from "../../penguins";
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
   position: { x: 200, y: 150 },
   data: {
      source: penguinE,
      type: 'both',
      label: "Eve",
      addon: (img : HTMLImageElement | null) => {
                  if (!img) return;

                  const svg: d3.Selection<SVGSVGElement, unknown, null, any> = d3.select(img.parentElement?.parentElement?.parentElement ?? null).select('svg.react-flow__edges.react-flow__container')
                  const middle: d3.Selection<SVGElement, unknown, null, any> = svg.select('.react-flow__edge-textwrapper')

                  middle.attr('visibility', 'visible')
                  middle.select('#eve-mark').remove()
                  const ringContainer = middle.append('g')
                     .attr('id', 'eve-mark')
                  ringContainer.append('text')
                     .attr('pointer-events', 'none')
                     .attr('x', 13)
                     .attr('y', 18)
                     .style('font-family', ekgTheme.fonts.header)
                     .style('font-size', '11px')
                     .text('Abfangen...')
                  const pulse = ringContainer
                     .append('circle')
                        .attr('fill', 'none')
                        .attr('r', '0')
                        .attr('opacity', '.7')
                        .attr('stroke', 'darkred')
                        .attr('stroke-width', '2')
                  // based on https://codepen.io/shaneparsons/pen/MpgEma
                  pulse.append('animate')
                     .attr('attributeName', 'r')
                     .attr('from', '6')
                     .attr('to', '15')
                     .attr('dur', '1.5s')
                     .attr('repeatCount', 'indefinite')
                     .attr('begin', '0s')
                  pulse.append('animate')
                     .attr('attributeName', 'opacity')
                     .attr('from', '.7')
                     .attr('to', '0')
                     .attr('dur', '1.5s')
                     .attr('repeatCount', 'indefinite')
                     .attr('begin', '0s')

                  ringContainer.append('circle')
                     .attr('r', 6)
                     .attr('opacity', '.7')
                     .attr('fill', 'darkred')
      }
   }
}

interface PenguinData {
   eve: boolean
   interactable: boolean
}

const PenguinsCommunicate: React.FC<PenguinData> = (props: PenguinData) => {
   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges);
   const [interactable, setInteractable ] = useState(props.interactable)

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
       minZoom={interactable ? 0.5 : undefined}
       maxZoom={interactable ? 1.5 : undefined}
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
         <Controls showZoom={false} showInteractive={true} showFitView={true} onInteractiveChange={status => setInteractable(status)} />
       }
     </ReactFlow>
   );
}

const EncryptionWords = /[Vv]erschlüssel(n|ung).*|[Ee]ncrypt.*/

export const Cryptography: React.FC = () => {
const [bullets, setBullets] = useState([] as string[])

const addNewElement =(e: React.FormEvent<HTMLFormElement>): void => {
   e.preventDefault()
   const input = document.getElementById('new-idea-input') as HTMLInputElement
   if(input.value.trim() === '') return
   setBullets([input.value, ...bullets])
   input.value = ''
   input.focus()
}

const updateElement = (index: number, e: React.FormEvent<HTMLFormElement>): void => {
   e.preventDefault()
   const input = document.getElementById(`old-idea-${index}`) as HTMLInputElement
   const newBullets = [...bullets]
   if(input.value.trim() === '') {
      newBullets.splice(index, 1)
   } else {
      newBullets[index] = input.value
   }
   setBullets(newBullets)
   input.value = ''
}
const triggerOnCorrect = (text: string, elem: React.JSX.Element) => {
   if(EncryptionWords.test(text)) {
      return (<RawText fontWeight="bold">{text}</RawText>)
   } else {
      return elem;
   }
}

return(<>
<Slide padding={'0px'} >
      <CenterOnSlide>
      <div style={{ width: "100%", height: "100%" }} className="penguins-communcation">
         <PenguinsCommunicate eve={false} interactable={true}/>
      </div>
      </CenterOnSlide>
    <Notes>
      TODO
   </Notes>
</Slide>

<Slide>
      <div style={{ position: 'absolute', right:'10px', top:'10px', width: "400px", height: "200px" }} className="penguins-communcation">
            <PenguinsCommunicate eve={true} interactable={false}/>
      </div>
      <Text fontWeight="bold">Was können Alice und Bob tun?</Text>
      <UnorderedList>
         <Appear><ListItem key='current'>
            <form onSubmit={e => addNewElement(e)}>
            <input placeholder="Ideen?" type="text" id='new-idea-input' autoFocus={true} autoComplete="off" className="seamless-input-new"></input>
            </form>
         </ListItem></Appear>
      </UnorderedList>
      <div style={{overflowY: 'auto', maxHeight: "60%"}}><UnorderedList>
         {bullets.map((bullet, i) => <ListItem key={bullet}>
            {triggerOnCorrect(bullet, (<form onSubmit={e => updateElement(i, e)} style={{margin:'0px', padding: '0px'}}>
               <input placeholder={bullet} type="text" id={`old-idea-${i}`} className="seamless-input" autoComplete="off"></input>
            </form>))}
            </ListItem>)}
      </UnorderedList></div>
    <Notes>
      TODO
   </Notes>
</Slide>

<Slide>
   <CenterOnSlide>
      <LargeWaveText text={"Klassische Verschlüsselung"}  svgHeight="150px" amplitude={40} points={15} />
   </CenterOnSlide>
</Slide>
</>)
}