import React from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./components/materialUi/theme";

import Navbar from "./components/navabar";
import Welcome from "./components/welcome";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Welcome />
    </ThemeProvider>
  );
}

export default App;
