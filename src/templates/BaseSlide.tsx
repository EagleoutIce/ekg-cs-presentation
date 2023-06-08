import React, { PropsWithChildren } from "react";
import { Box, FlexBox, Heading, Progress, Slide, Text } from "spectacle";

interface BaseSlideProps {
  title?: string;
  hideBottomBar?: boolean;
}

const BaseSlide: React.FC<PropsWithChildren<BaseSlideProps>> = ({
  title,
  children
}) => (
  <Slide backgroundColor="lightWhite" padding="0px">
    {title && (
      <Heading
        width="100%"
        backgroundColor="secondary"
        color="lightWhite"
        textAlign="left"
        padding="10px 20px"
        margin="0px"
      >
        {title}
      </Heading>
    )}
    <Box padding="24px">{children}</Box>
  </Slide>
);

export default BaseSlide;
