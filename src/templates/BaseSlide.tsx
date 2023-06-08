import React, { PropsWithChildren } from "react";
import { Box, FlexBox, Heading, Slide, Text } from "spectacle";
import { organizationSettings } from "../organization.settings";
interface BaseSlideProps {
  title?: string;
  hideBottomBar?: boolean;
}

const BaseSlide: React.FC<PropsWithChildren<BaseSlideProps>> = ({
  title,
  hideBottomBar,
  children,
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
    {!hideBottomBar && (
      <Box
        width="100%"
        position="absolute"
        bottom="0px"
        padding="0px"
        backgroundColor="bottomBar"
      >
        <FlexBox
          flexDirection="row"
          justifyContent="space-between"
          padding="4px 24px"
        >
          <img src={organizationSettings.logoUrl} width="120px" />
          <Text margin="0px" padding="0px" fontSize="16px" color="primary">
            {organizationSettings.slideFooterText}
          </Text>
        </FlexBox>
      </Box>
    )}
  </Slide>
);

export default BaseSlide;
