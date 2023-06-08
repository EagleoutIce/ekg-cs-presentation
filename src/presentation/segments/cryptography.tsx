import { Appear, Text, Slide, Notes, Image } from "spectacle";
import { CenterOnSlide,  LargeWaveText,  RawText,  References, WaveText } from "../../templates/styles";
import { penguinA } from "../../penguins";


export const Cryptography: React.FC = () => {
   return (<Slide>
    <CenterOnSlide>
      <Image src={penguinA} height="10px"/>
    </CenterOnSlide>
    <Notes>
      TODO
   </Notes>
   </Slide>)
}