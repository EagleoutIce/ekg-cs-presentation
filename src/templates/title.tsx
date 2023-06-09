import React from "react";
import { Box, FlexBox, FullScreen, Heading, Progress, Slide, Text } from "spectacle";
import { ekgTheme } from "../settings";
import { CenterOnSlide, LargeWaveText, LowerLeft, References, TopRight, WaveText } from "./styles";
import { gitHubLogo } from "../images";

interface TitleSlideInputs {
  title: string
}

const TitleSlide: React.FC<TitleSlideInputs> = ({ title }) => (
  <Slide>
    <CenterOnSlide>
      <LargeWaveText text={title} svgHeight="150px" amplitude={40} points={15}/>
    </CenterOnSlide>
    <TopRight>
      <a href="https://github.com/EagleoutIce/ekg-cs-presentation">
        <img src={gitHubLogo} width={32} height={32}/>
      </a>
    </TopRight>
  </Slide>
);

export default TitleSlide;
