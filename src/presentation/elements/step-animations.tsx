import { useEffect, useState } from "react";
import { LowerLeft } from "../../templates/styles";

export interface StepAnimationProps {
   maxStep: number
   onStep: (step: number, maxStep: number) => JSX.Element
}

export const StepAnimations: React.FC<StepAnimationProps> = (props: StepAnimationProps) => {
   const [step, setStep] = useState(0)
   const [content, setContent] = useState(props.onStep(step, props.maxStep))
   const updateStep = (update: (oldStep: number) => number) => {
      const nextStep = update(step)
      setContent(() => props.onStep(nextStep, props.maxStep))
      setStep(update)
   }

   return(<>
   <LowerLeft>
      { step < props.maxStep && <button className="basic-control" onClick={() => {updateStep(s => s + 1)}}>⮞</button> }
      <button className="basic-control" onClick={() => updateStep(() => 0)}>↺</button>
   </LowerLeft>
   {content}
   </>)
}