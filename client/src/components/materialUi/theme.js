import { createMuiTheme } from "@material-ui/core/styles";

const fixWhite = "#F5F5F5";
const fixBlue = "#1976d2";

export default createMuiTheme({
  palette: {
    common: {
      fixBlue: `${fixWhite}`,
      fixOrange: `${fixBlue}`,
    },
    primary: {
      main: `${fixWhite}`,
    },
    secondary: {
      main: `${fixBlue}`,
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Montserrat",
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
