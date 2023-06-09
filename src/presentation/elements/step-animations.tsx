import { useState } from "react";
import { LowerLeft } from "../../templates/styles";

export interface StepAnimationProps {
   maxStep: number
   onStep: (step: number, maxStep: number) => JSX.Element
}

export const StepAnimations: React.FC<StepAnimationProps> = (props: StepAnimationProps) => {
   const [step, updateStep] = useState(0)
   return(<>

   <LowerLeft>
      <button className="basic-control"></button>
   </LowerLeft>
   </>)
}