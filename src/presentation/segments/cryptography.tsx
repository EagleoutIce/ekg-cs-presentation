import { Text, Slide, Notes, UnorderedList, ListItem, Appear } from "spectacle";
import { CenterOnSlide, LargeWaveText, RawText } from "../../templates/styles";
import { PenguinsCommunicate } from "../elements/penguins-commmunicate";
import { UserBulletPoints } from "../elements/updateable-bulletpoints";
import { StepAnimations } from "../elements/step-animations";
import * as d3 from 'd3';
import { useCallback } from "react";


const EncryptionWords = /[Vv]erschlüssel(n|ung).*|[Ee]ncrypt.*/;

const CypherArray = Array.from({ length: 26 }, (_, i) => ({ a: String.fromCharCode(97 + i), num: i }));

const colors = ['#e59f37', '#7A9B76', '#FE5F55', '#587291']; // '#611b37'
const code = [ 'c', 'o', 'd', 'e' ];
const cypher = [ 'd', 'p', 'e', 'f' ];

// TODO: maybe move to mxgraph or alternatives
function symmetricEncryptionStep(step: number, node: SVGSVGElement | null): void {
   const svg = d3.select(node);
   if(step === 0) {
      svg.selectAll("*").remove(); // in case of reset
      // based on https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/marker-end
      svg.append("defs").append("svg:marker")
         .attr("id", "triangle")
         .attr("refX", 1)
         .attr("refY", 7.5)
         .attr('viewBox', '0 0 15 15')
         .attr("markerWidth", 15)
         .attr("markerHeight", 15)
         .attr("orient", "auto")
         .append("path")
         .attr("d", "M 0 0 L 15 7.5 L 0 15 z")
         .style("fill", "gray");
      for(let i = 0; i < 4; i++) {
         svg.append('circle')
            .attr('id', `cypher-text-${i}`)
            .attr('cx', 125 + (i - 1.5) * 15)
            .attr('cy', '70')
            .attr('r', '6')
            .on('mouseover', d => { d.target.style.fill = colors[i]; })
            .on('mouseout', d => { d.target.style.fill = 'black'; })
            .classed('cypher-text', true)
            .style('transition', '1s')
            .append('animate')
            .attr('attributeName', 'r')
            .attr('values', '6;7;6')
            .attr('dur', '1s')
            .attr('repeatCount', 'indefinite');
         svg.append('text')
            .attr('id', `cypher-text-${i}-text`)
            .attr('x', 125 + (i - 1.5) * 15)
            .attr('y', '70')
            .style('transition', '1s')
            .attr('pointer-events', 'none')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .classed('cypher-table-text', true)
            .text(code[i]);
         svg.select(`#cypher-text-${i}-line`).remove();
         svg.append('line')
            .attr('id', `cypher-text-${i}-line`)
            .attr("x1", 90+6)
            .attr("y1", i * 15 + 50)
            .attr("x2", 90+6)
            .attr("y2", i * 15 + 50)
            .attr("stroke-width", .1)
            .attr('transition', '1s')
            .attr("stroke", "gray");
         svg.append('circle')
            .attr('id', `cypher-text-${i}-out`)
            .attr('cx', 163)
            .attr('opacity', 0)
            .attr('cy', i * 15 + 50)
            .attr('r', '6')
            .style('fill', colors[i])
            .style('filter', 'brightness(50%)')
            .style('transition', '1s');
         svg.append('text')
            .attr('id', `cypher-text-${i}-out-text`)
            .attr('x', 163)
            .attr('y', i * 15 + 50)
            .attr('opacity', 0)
            .style('transition', '1s')
            .attr('pointer-events', 'none')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .classed('cypher-table-text', true)
            .text(cypher[i]);
         // decode
         svg.select(`#cypher-text-${i}-decode-line`).remove();
         svg.append('line')
            .attr('id', `cypher-text-${i}-decode-line`)
            .attr("x1", 90+6+15)
            .attr("y1", i * 15 + 50)
            .attr("x2", 90+6+15)
            .attr("y2", i * 15 + 50)
            .attr("stroke-width", .1)
            .attr('transition', '1s')
            .attr("stroke", "gray");
         svg.append('circle')
            .attr('id', `cypher-text-${i}-decode-out`)
            .attr('cx', 163+100)
            .attr('opacity', 0)
            .attr('cy', i * 15 + 50)
            .attr('r', '6')
            .style('fill', colors[i])
            .style('filter', 'brightness(50%)')
            .style('transition', '1s');
         svg.append('text')
            .attr('id', `cypher-text-${i}-out-decode-text`)
            .attr('x', 163+100)
            .attr('y', i * 15 + 50)
            .attr('opacity', 0)
            .style('transition', '1s')
            .attr('pointer-events', 'none')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .classed('cypher-table-text', true)
            .text(cypher[i]);
      }
   }
   if(step >= 1) {
      for(let i = 0; i < 4; i++) {
         setTimeout(() => {// timeout-delay is to fragile
            const circle = d3.select(`#cypher-text-${i}`);
            circle.select('animate').remove();
            circle
               .style('fill', colors[i])
               .on('mouseover', d => { d.target.setAttribute('r', '7'); })
               .on('mouseout', d => { d.target.setAttribute('r', '6'); })
               .style('transition', '1s')
               .attr('cx', 85)
               .attr('cy', i * 15 + 50);
            const text = d3.select(`#cypher-text-${i}-text`);
            text
               .style('transition', '1s')
               .attr('x', 85)
               .attr('y', i * 15 + 50);
            }, i * 100)
      }
   }
   if(step >= 2) {
      for(let i = 0; i < 4; i++) {
         setTimeout(() => {
            svg.select(`#cypher-text-${i}-line`)
               .attr("x2", 150)
               .attr("marker-end", "url(#triangle)")
         }, i * 100 + 500)
         setTimeout(() => {
            svg.select(`#cypher-text-${i}-out`)
               .attr('opacity', 1)
            svg.select(`#cypher-text-${i}-out-text`)
               .attr('opacity', 1)
         }, i * 100 + 1000)
      }
   }
   if(step >= 3) {
      for(let i = 0; i < 4; i++) {
         setTimeout(() => {
            svg.select(`#cypher-text-${i}-decode-line`)
               .attr("x2", 150)
               .attr("marker-end", "url(#triangle)")
         }, i * 100 + 500)
         setTimeout(() => {
            svg.select(`#cypher-text-${i}-decode-out`)
               .attr('opacity', 1)
            svg.select(`#cypher-text-${i}-out-decode-text`)
               .attr('opacity', 1)
         }, i * 100 + 1000)
      }
   }
}

function useSymmetricEncryptionSteps(): (step: number, maxStep: number) => React.JSX.Element {
   let svg: SVGSVGElement | null = null;
   const svgRefCallback = useCallback((node: SVGSVGElement) => {
      symmetricEncryptionStep(0, node);
      svg = node;
   }, []);

   return (step: number, maxStep: number) => {
      symmetricEncryptionStep(step, svg);
      return (
            <svg id="symmetric-encryption-steps" ref={svgRefCallback} viewBox="0 0 250 150" height='15cm' width='25cm'></svg>
         );
   };
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

      <Slide>
         <Text fontWeight="bold">Symmetrische Verschlüsselung</Text>
         <div style={{ position: "absolute" }}>
         <CenterOnSlide>
            <StepAnimations maxStep={4} onStep={useSymmetricEncryptionSteps()} />
         </CenterOnSlide>
         </div>
         <div style={{ position: "absolute", marginTop: '11cm' }}>
         <UnorderedList>
            <Appear><ListItem>Ein Schlüssel für Ver- und Entschlüsselung</ListItem></Appear>
            <Appear><ListItem>Beide müssen den Schlüssel kennen</ListItem></Appear>
         </UnorderedList>
         </div>
      </Slide>

      <Slide>
         <Text fontWeight="bold">Asymmetrische Verschlüsselung</Text>
      </Slide>
   </>);
}

