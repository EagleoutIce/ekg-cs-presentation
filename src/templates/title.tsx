import React from "react";
import Wave from 'react-wavify'
import { Box, FlexBox, FullScreen, Heading, Progress, Slide, Text } from "spectacle";
import { ekgTheme } from "../settings";
import { WaveText } from "./wave";

interface TitleSlideInputs {
  title: string
}

const TitleSlide: React.FC<TitleSlideInputs> = ({ title }) => (
  <Slide backgroundColor="lightWhite">
    <FlexBox flexDirection="column" justifyContent="center" height="100%">
      <WaveText text={title} color={ekgTheme.colors.primary} size={ekgTheme.fontSizes.h1} weight='bold' family={ekgTheme.fonts.header} />
    </FlexBox>
  </Slide>
);

export default TitleSlide;
