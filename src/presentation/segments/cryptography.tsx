import { Text, Slide, Notes } from "spectacle";
import { CenterOnSlide, LargeWaveText, RawText } from "../../templates/styles";
import { PenguinsCommunicate } from "../elements/penguins-commmunicate";
import { UserBulletPoints } from "../elements/updateable-bulletpoints";
import { StepAnimations } from "../elements/step-animations";
import * as d3 from 'd3';
import { useCallback } from "react";
import { ekgTheme } from "../../settings";
import { penguinA } from "../../images";

const EncryptionWords = /[Vv]erschlüssel(n|ung).*|[Ee]ncrypt.*/;

const CypherArray = Array.from({ length: 26 }, (_, i) => ({ a: String.fromCharCode(97 + i), num: i }));

function symmetricEncryptionStep(step: number, node: SVGSVGElement | null): void {
   const svg = d3.select(node);
   if(step === 0) {
      svg.selectAll("*").remove(); // in case of reset
      svg.append('text')
         .attr('id', 'cypher-text')
         .attr('x', '50')
         .attr('y', '52')
         .text('code')
         .style('font-size', '10px')
         .style('font-family', ekgTheme.fonts.header)
         .style('transition', '500ms')
         .attr('text-align', 'middle')
         .append('animate')
         .attr('attributeName', 'y')
         .attr('values', '50;51;50')
         .attr('dur', '1s')
         .attr('repeatCount', 'indefinite');
      svg.append('image')
         .attr('id', 'cypher-img')
         .attr('x', '35')
         .attr('y', '62')
         .attr('width', '42')
         .attr('height', '42')
         .classed('cypher-image', true)
         .attr('href', penguinA)

      svg.select('#cypher-table').remove();
      // svg.data?
      const table = svg.append('g')
         .attr('id', 'cypher-table')
         .attr('opacity', '0')
         .attr('transition', '500ms')
         .attr('transform', 'translate(130, 30)');
      let i = 0;
      for(let { a, num } of CypherArray) {
         if(a == 'p') {
            a = '⋮';
            num = '⋮' as any;
         }
         const group = table.append('g')
            .attr('transform', (_, a) => `translate(0, ${i * 7.5})`);
         group.append('text')
            .attr('id', `cypher-table-${a}`)
            .classed('cypher-table-text', true)
            .style('text-anchor', 'middle')
            .text(a);
         group.append('text')
            .attr('id', `cypher-table-${a}-arrow`)
            .classed('cypher-table-text', true)
            .attr('x', '6')
            .attr('y', '-.66')
            .attr('fill', 'darkgray')
            .style('text-anchor', 'middle')
            .text('→');
         group.append('text')
            .attr('id', `cypher-table-${a}-value`)
            .classed('cypher-table-text', true)
            .attr('x', '16')
            .style('text-anchor', 'end')
            .text(num);
         if(a >= 'p') {
            break;
         }
         i++;
      }
   }
   if(step >= 1) {
      svg.select('#cypher-text').select('animate').remove();
      d3.select('#cypher-table')
         .attr('opacity', '1');
   }
   if(step === 2) {
      svg.select('#cypher-table-c')
         .attr('font-weight', 'bold');
   }
   if(step === 3) {
      svg.select('#cypher-text')
         .style('fill', 'cyan');
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
         <div style={{ width: '100vw', height: '100vh' }}>
            <svg id="symmetric-encryption-steps" ref={svgRefCallback} viewBox="0 0 250 250"></svg>
         </div>);
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
         <CenterOnSlide>
         <StepAnimations maxStep={6} onStep={useSymmetricEncryptionSteps()} />
         </CenterOnSlide>
      </Slide>

      <Slide>
         <Text fontWeight="bold">Asymmetrische Verschlüsselung</Text>
      </Slide>
   </>);
}

