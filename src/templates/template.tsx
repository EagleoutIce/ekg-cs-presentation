import { ReactNode } from "react";
import { Box, FlexBox, FullScreen, Progress } from "spectacle";

export function template(options: {slideNumber: number; numberOfSlides: number;}): ReactNode {
   return (
      <FlexBox
      justifyContent="space-between"
      position="absolute"
      bottom={0}
      width={1}
    >
      <Box padding="0em 1em">
        { options.slideNumber === 1 ? <FullScreen color="primary"/> : <></>}
      </Box>
      <Box padding="1em">
        <Progress color="gray"/>
      </Box>
    </FlexBox>
   );
}