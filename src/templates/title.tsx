import React from "react";
import { Box, FlexBox, FullScreen, Heading, Progress, Slide, Text } from "spectacle";
import { ekgTheme } from "../settings";
import { CenterOnSlide, LargeWaveText, WaveText } from "./styles";

interface TitleSlideInputs {
  title: string
}

const TitleSlide: React.FC<TitleSlideInputs> = ({ title }) => (
  <Slide>
    <CenterOnSlide>
      <LargeWaveText text={title} svgHeight="150px" amplitude={40} points={15}/>
    </CenterOnSlide>
  </Slide>
);

export default TitleSlide;
