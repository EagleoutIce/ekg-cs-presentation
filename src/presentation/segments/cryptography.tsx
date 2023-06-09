import { Text, Slide, Notes } from "spectacle";
import { CenterOnSlide,  LargeWaveText,  RawText } from "../../templates/styles";
import { PenguinsCommunicate } from "../elements/penguins-commmunicate";
import { UserBulletPoints } from "../elements/updateable-bulletpoints";


const EncryptionWords = /[Vv]erschlüssel(n|ung).*|[Ee]ncrypt.*/

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
</>)
}

