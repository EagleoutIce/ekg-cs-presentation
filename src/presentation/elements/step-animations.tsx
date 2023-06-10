import { Stepper } from "spectacle";

export interface StepAnimationProps {
   maxStep: number
   onStep: (step: number, maxStep: number) => JSX.Element
}

export const StepAnimations: React.FC<StepAnimationProps> = (props: StepAnimationProps) => {
   const updateStep = (update: number) => {
      return props.onStep(update, props.maxStep)
   }

   return(<>
   {/* <LowerMid>
      { step < props.maxStep && <button className="basic-control" style={{ width: "1.5cm", height: "1.5cm", fontSize: '16pt' }} onClick={() => {updateStep(s => s + 1)}}>▸</button> }
      <button className="basic-control" style={{ width: "1.5cm", height: "1.5cm", fontSize: '16pt' }} onClick={() => updateStep(() => 0)}>⟲</button>
   </LowerMid> */}
   <Stepper values={new Array(props.maxStep)} alwaysVisible>
   { (v, step, active) => {
      if(active) {
         return updateStep(step)
      }
      return <></>
   }}
   </Stepper>
   </>)
}