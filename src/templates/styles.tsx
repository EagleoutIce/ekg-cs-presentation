import { ReactNode } from "react";
import { createPortal } from "react-dom";
import Wave from "react-wavify";
import { FlexBox, Slide, Text } from "spectacle";
import { ekgTheme } from "../settings";

interface WaveTextInputs {
   text: string
   color?: string
   size?: string
   weight?: string
   family?: string
   paused?: boolean
   opacity?: string
   height?: number
   svgHeight?: string
   amplitude?: number
   speed?: number
   points?: number
}

export const LargeWaveText: React.FC<WaveTextInputs> = (config: WaveTextInputs) => (
   <WaveText text={config.text} color={config.color ?? ekgTheme.colors.primary} size={config.size ?? ekgTheme.fontSizes.h1} weight={config.weight ?? 'bold'} family={config.family ?? ekgTheme.fonts.header} height={config.height} amplitude={config.amplitude} speed={config.speed} points={config.points} paused={config.paused} svgHeight={config.svgHeight ?? '72px'}/>
);

export const WaveText: React.FC<WaveTextInputs> = (config: WaveTextInputs) => {
   const randomMaskId = `mask-${Math.random()}`;
   return (
      <div style={{ height: config.svgHeight, width: '100%' }}>
      <Wave fill={config.color} paused={config.paused} mask={`url(#${randomMaskId})`} options={{ points: config.points ?? 40, speed: config.speed ?? 0.1, amplitude: config.amplitude ?? 30, height: config.height ?? 20 }} >
         <defs>
         <mask id={randomMaskId} >
            <text x="50%" y="50%" fontSize={config.size} fontWeight={config.weight} fontFamily={config.family} textAnchor="middle" fill="white" dominantBaseline='middle'>{config.text}</text>
         </mask>
         </defs>
         <text x="50%" y="50%"  fontSize={config.size} fontWeight={config.weight} fontFamily={config.family} textAnchor="middle" fill={config.color} opacity={config.opacity ?? '0.2'} dominantBaseline='middle' >{config.text}</text>
      </Wave>
      </div>
      );
}

export const CenterOnSlide: React.FC<React.PropsWithChildren> = ({ children }) => (
   <FlexBox flexDirection="column" justifyContent="center" height="100%">
      {children}
   </FlexBox>
);


interface RawTextInputs {
   fontSize?: string
   fontWeight?: string
   fontFamily?: string
}

export const RawText: React.FC<React.PropsWithChildren<RawTextInputs>> = ({ children, fontSize, fontWeight, fontFamily }) => (
   <Text fontSize={fontSize} fontWeight={fontWeight} fontFamily={fontFamily} margin="0em" padding="0em">
      {children}
   </Text>
);


export const LowerLeft: React.FC<React.PropsWithChildren> = ({children}) => (
   <FlexBox justifyContent="space-between" position="absolute" bottom={0} width={1}>
      {children}
   </FlexBox>
)

export const TopRight: React.FC<React.PropsWithChildren> = ({children}) => (
   <FlexBox justifyContent="flex-end" position="absolute" top={0} right={0} width={1} alignItems='flex-end' padding={"0em"}>
      {children}
   </FlexBox>
)


export const References: React.FC<React.PropsWithChildren> = ({ children }) => (
   <LowerLeft>
      <div className="references">
      {children}
      </div>
   </LowerLeft>
);

