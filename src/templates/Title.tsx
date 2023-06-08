import React from "react";
import { FlexBox, Heading, Slide, Text } from "spectacle";
import { customTheme, organizationSettings } from "../organization.settings";

interface TitleSlideInputs {
  title: string;
  subtitle?: string;
}

const TitleSlide: React.FC<TitleSlideInputs> = ({ title, subtitle }) => (
  <Slide backgroundColor="secondary">
    <FlexBox flexDirection="column" justifyContent="center" height="100%">
      <Heading margin="2px" padding="2px" color="lightWhite">
        {title}
      </Heading>
      <div
        style={{
          marginTop: "20px",
          height: "4px",
          width: "120px",
          backgroundColor: customTheme.colors.lightWhite,
          borderRadius: "20px",
        }}
      />
      <Text textAlign="center">{subtitle}</Text>
    </FlexBox>
    <FlexBox alignItems="center">
      <img src={organizationSettings.logoLightUrl} width="120px" />
    </FlexBox>
  </Slide>
);

export default TitleSlide;
