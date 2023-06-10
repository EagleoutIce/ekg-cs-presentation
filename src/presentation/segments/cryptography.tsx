import { Text, Slide, Notes } from "spectacle";
import { CenterOnSlide,  LargeWaveText,  RawText } from "../../templates/styles";
import { PenguinsCommunicate } from "../elements/penguins-commmunicate";
import { UserBulletPoints } from "../elements/updateable-bulletpoints";
import { StepAnimations } from "../elements/step-animations";
import * as d3 from 'd3'
import { useCallback } from "react";

const EncryptionWords = /[Vv]erschlüssel(n|ung).*|[Ee]ncrypt.*/

function symmetricEncryptionStep(step: number, node: SVGSVGElement | null): void {
   const svg = d3.select(node);
   if(step === 0) {
      svg.selectAll("*").remove(); // in case of reset
      svg.append('circle')
         .attr('id', 'magic-circle')
         .attr('cx', '50')
         .attr('cy', '50')
         .attr('r', 20)
         .attr('fill', 'green')
         .style('transition', '500ms')
   } else if(step === 1) {
      svg.select('#magic-circle')
         .attr('fill', 'orange')
   } else if(step === 2) {
      svg.select('#magic-circle')
         .attr('cx', '100')
   }  else if(step === 3) {
      svg.select('#magic-circle')
         .attr('r', '40')
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
   return (<CenterOnSlide>
      <div className="full-svg">
         <svg id="symmetric-encryption-steps" ref={svgRefCallback} viewBox="0 0 250 250"></svg>
      </div>
   </CenterOnSlide>)
}
}

export const Cryptography: React.FC = () => {

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
      <UserBulletPoints id="alice-and-bob-ideas" maxHeight="60%" specialTrigger={triggerOnCorrect} />
    <Notes>
      TODO
   </Notes>
</Slide>

<Slide>
   <CenterOnSlide>
      <LargeWaveText text={"Klassische Verschlüsselung"}  svgHeight="150px" amplitude={40} points={15} />
   </CenterOnSlide>
</Slide>

<Slide>
<Text fontWeight="bold">Symmetrische Verschlüsselung</Text>
<StepAnimations maxStep={3} onStep={useSymmetricEncryptionSteps()} />
</Slide>

<Slide>
   <Text fontWeight="bold">Asymmetrische Verschlüsselung</Text>
</Slide>
</>)
}

