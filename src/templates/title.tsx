import React from "react";
import Wave from 'react-wavify'
import { Box, FlexBox, FullScreen, Heading, Progress, Slide, Text } from "spectacle";
import { ekgTheme } from "../settings";

interface TitleSlideInputs {
  title: string
}

const TitleSlide: React.FC<TitleSlideInputs> = ({ title }) => (
  <Slide backgroundColor="lightWhite">
    <FlexBox flexDirection="column" justifyContent="center" height="100%">
      <Text style={{ width: '100%' }}>
      <Wave fill={ekgTheme.colors.primary} paused={false} mask="url(#mask)" options={{ points: 40, speed: 0.1, amplitude: 30, height: 20 }}>
        <defs>
          <mask id="mask" >
            <text x="50%" y="50%" fontSize={ekgTheme.fontSizes.h1} fontWeight="bold" fontFamily={ekgTheme.fonts.header} textAnchor="middle" fill="white">{title}</text>
          </mask>
        </defs>
        <text x="50%" y="50%" fontSize={ekgTheme.fontSizes.h1} fontWeight="bold" fontFamily={ekgTheme.fonts.header} textAnchor="middle" fill={ekgTheme.colors.primary} opacity=".2">{title}</text>
      </Wave>
      </Text>
    </FlexBox>
  </Slide>
);

export default TitleSlide;
