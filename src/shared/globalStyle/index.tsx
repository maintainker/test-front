import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme/default";
import { GlobalStyle } from "./style";

const GlobalThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={{ ...theme }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
export default GlobalThemeProvider;
