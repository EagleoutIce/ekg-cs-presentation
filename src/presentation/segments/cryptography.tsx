import { Text, Slide, Notes, UnorderedList, ListItem, Appear } from "spectacle";
import { CenterOnSlide, LargeWaveText, RawText } from "../../templates/styles";
import { MainBubbleNode, MainImageNode, PenguinsCommunicate } from "../elements/penguins-commmunicate";
import { UserBulletPoints } from "../elements/updateable-bulletpoints";
import { StepAnimations } from "../elements/step-animations";
import * as d3 from 'd3';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Background, Panel, ReactFlow, useEdgesState, useNodesState } from "reactflow";
import { penguinA, penguinB } from "../../images";


const EncryptionWords = /[Vv]erschlüssel(n|ung).*|[Ee]ncrypt.*/;

const CypherArray = Array.from({ length: 26 }, (_, i) => ({ a: String.fromCharCode(97 + i), num: i }));

const colors = ['#e59f37', '#7A9B76', '#FE5F55', '#587291']; // '#611b37'
const initialNodes = [
   { id: '1', type: 'image', position: { x: 0, y: 0 }, data: { source: penguinA, type: 'out', label: "Alice" } },
   { id: '2', type: 'image', position: { x: 400, y: 0 }, data: { source: penguinB, type: 'in', label: "Bob" } },
   { id: 'code-3', type: 'bubble', position: { x: 100, y: 0 }, data: { label: 'c', color: colors[0] } },
   { id: 'code-4', type: 'bubble', position: { x: 140, y: 0 }, data: { label: 'o', color: colors[1] } },
   { id: 'code-5', type: 'bubble', position: { x: 180, y: 0 }, data: { label: 'd', color: colors[2] } },
   { id: 'code-6', type: 'bubble', position: { x: 220, y: 0 }, data: { label: 'e', color: colors[3] } },
 ];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', label: ' ' }];

const defaultEdgeOptions = {
   animated: true
 };
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };


// TODO: maybe move to mxgraph or alternatives
function useSymmetricEncryptionSteps(): (step: number) =>  React.JSX.Element {
   let [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   const nodeTypes = useMemo(() => ({ image: MainImageNode, bubble: MainBubbleNode }), []);


   return (step: number) => {
      if(step === 1) {
         updateCode();
      }
   return (<ReactFlow
   nodes={nodes}
   edges={edges}
   onNodesChange={onNodesChange}
   nodeTypes={nodeTypes}
   defaultEdgeOptions={defaultEdgeOptions}
   defaultViewport={defaultViewport}
   snapToGrid={false}
   fitView={true}
   /** if it is not interactable set fixed*/
   minZoom={0.65}
   maxZoom={1.75}
   edgesUpdatable={false}
   nodesConnectable={false}
   nodesDraggable={false}
   zoomOnScroll={false}
   zoomOnPinch={false}
   panOnDrag={false}
   panOnScroll={false}
   autoPanOnNodeDrag={false}
   autoPanOnConnect={false}
   disableKeyboardA11y={true}
   edgesFocusable={false}
   proOptions={{ hideAttribution: true }}
   style={{
     padding: 0,
     margin: 0
   }}
   >
      <Panel position="top-left">
         <Text fontWeight="bold">Symmetrische Verschlüsselung</Text>
      </Panel>
    </ReactFlow>
   )

function updateCode() {
      nodes = nodes.map(n => {
         if(n.id.startsWith('code-')) {
            n.hidden = false;
         }
         return n;
      });
   }
}
}


export const Cryptography: React.FC = () => {

   const triggerOnCorrect = (text: string, elem: React.JSX.Element) => {
      if(EncryptionWords.test(text)) {
         return (<RawText fontWeight="bold">{text}</RawText>);
      } else {
         return elem;
      }
   };

   return (<>
      <Slide padding={'0px'} >
         <CenterOnSlide>
            <div style={{ width: "100%", height: "100%" }} className="penguins-communcation">
               <PenguinsCommunicate eve={false} interactable={true} />
            </div>
         </CenterOnSlide>
         <Notes>
            TODO
         </Notes>
      </Slide>

      <Slide>
         <div style={{ position: 'absolute', right: '10px', top: '10px', width: "400px", height: "200px" }} className="penguins-communcation">
            <PenguinsCommunicate eve={true} interactable={false} />
         </div>
         <Text fontWeight="bold">Was können Alice und Bob tun?</Text>
         <UserBulletPoints id="alice-and-bob-ideas" maxHeight="60%" specialTrigger={triggerOnCorrect} />
         <Notes>
            TODO
         </Notes>
      </Slide>

      <Slide>
         <CenterOnSlide>
            <LargeWaveText text={"Klassische Verschlüsselung"} svgHeight="150px" amplitude={40} points={15} />
         </CenterOnSlide>
      </Slide>

      <Slide  padding={'0px'} >
         <CenterOnSlide>
            <div style={{ width: "100%", height: "100%" }} className="penguins-communcation">
            <StepAnimations maxStep={4} onStep={useSymmetricEncryptionSteps()} />
            </div>
         </CenterOnSlide>
         {/* <div style={{ position: "absolute", marginTop: '11cm' }}>
         <UnorderedList>
            <Appear><ListItem>Ein Schlüssel für Ver- und Entschlüsselung</ListItem></Appear>
            <Appear><ListItem>Beide müssen den Schlüssel kennen</ListItem></Appear>
         </UnorderedList>
         </div> */}
      </Slide>

      <Slide>
         <Text fontWeight="bold">Asymmetrische Verschlüsselung</Text>
      </Slide>
   </>);
}

