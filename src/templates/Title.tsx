import React from "react";
import { Box, FlexBox, FullScreen, Heading, Progress, Slide, Text } from "spectacle";

interface TitleSlideInputs {
  title: string;
  subtitle?: string;
}

const TitleSlide: React.FC<TitleSlideInputs> = ({ title, subtitle }) => (
  <Slide backgroundColor="lightWhite">
    <FlexBox flexDirection="column" justifyContent="center" height="100%">
      <Heading margin="2px" padding="2px" color="primary">
        {title}
      </Heading>
      <Text textAlign="center">{subtitle}</Text>
    </FlexBox>
  </Slide>
);

export default TitleSlide;
