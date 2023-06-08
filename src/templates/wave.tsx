import { ReactNode } from "react";
import Wave from "react-wavify";

interface WaveTextInputs {
   text: string
   color: string
   size?: string
   weight?: string
   family?: string
   opacity?: string
}

export const WaveText: React.FC<WaveTextInputs> = (config: WaveTextInputs) => {
   return (
      <Wave fill={config.color} paused={false} mask="url(#mask)" options={{ points: 40, speed: 0.1, amplitude: 30, height: 20 }}>
         <defs>
         <mask id="mask" >
            <text x="50%" y="50%" fontSize={config.size} fontWeight={config.weight} fontFamily={config.family} textAnchor="middle" fill="white">{config.text}</text>
         </mask>
         </defs>
         <text x="50%" y="50%"  fontSize={config.size} fontWeight={config.weight} fontFamily={config.family} textAnchor="middle" fill={config.color} opacity={config.opacity ?? '0.2'}>{config.text}</text>
      </Wave>
      );
}