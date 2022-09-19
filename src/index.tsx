import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./pages";
import GlobalThemeProvider from "./shared/globalStyle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalThemeProvider>
      <AppRouter />
    </GlobalThemeProvider>
  </React.StrictMode>
);
