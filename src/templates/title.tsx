import React from "react";
import { Box, FlexBox, FullScreen, Heading, Progress, Slide, Text } from "spectacle";
import { ekgTheme } from "../settings";
import { CenterOnSlide, WaveText } from "./styles";

interface TitleSlideInputs {
  title: string
}

const TitleSlide: React.FC<TitleSlideInputs> = ({ title }) => (
  <Slide>
    <CenterOnSlide>
      <WaveText text={title} color={ekgTheme.colors.primary} size={ekgTheme.fontSizes.h1} weight='bold' family={ekgTheme.fonts.header} />
    </CenterOnSlide>
  </Slide>
);

export default TitleSlide;
