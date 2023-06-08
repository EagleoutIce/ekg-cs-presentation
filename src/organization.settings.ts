import { OrgSettings } from "./types";

export const customTheme: Record<string, any> = {
  // size: {
  //   width: 1366,
  //   height: 768,
  //   maxCodePaneHeight: 200,
  // },
  colors: {
    primary: "#323232",
    secondary: "#2C97AD",
    lightWhite: "#FCFCFC",
    bottomBar: "#F2F2F2",
  },
  fonts: {
    header: '"Nova Round", Helvetica, Arial, sans-serif',
  },
  fontSizes: {
    h1: "72px",
    h2: "64px",
  },
};

export const organizationSettings: OrgSettings = {
  logoUrl: "/images/artcoded-logo.png",
  logoLightUrl: "/images/artcoded-logo-light.png",
  slideFooterText: "artcoded.net",
};
