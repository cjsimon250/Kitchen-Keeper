import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d5d4d4",
          200: "#acaaa8",
          300: "#827f7d",
          400: "#595551",
          500: "#2f2a26",
          600: "#26221e",
          700: "#1c1917",
          800: "#13110f",
          900: "#090808",
        },
        greenAccent: {
          100: "#f1f5e6",
          200: "#e3ebcd",
          300: "#d6e0b3",
          400: "#c8d69a",
          500: "#bacc81",
          600: "#95a367",
          700: "#707a4d",
          800: "#4a5234",
          900: "#25291a",
        },
        orangeAccent: {
          100: "#fbedd9",
          200: "#f8dab3",
          300: "#f4c88e",
          400: "#f1b568",
          500: "#eda342",
          600: "#be8235",
          700: "#8e6228",
          800: "#5f411a",
          900: "#2f210d",
        },
        khakiAccent: {
          100: "#f3eeea",
          200: "#e7ded5",
          300: "#dccdbf",
          400: "#d0bdaa",
          500: "#c4ac95",
          600: "#9d8a77",
          700: "#766759",
          800: "#4e453c",
          900: "#27221e",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#090808",
          200: "#13110f",
          300: "#1c1917",
          400: "#26221e",
          500: "#2f2a26",
          600: "#595551",
          700: "#827f7d",
          800: "#acaaa8",
          900: "#d5d4d4",
        },
        greenAccent: {
          100: "#25291a",
          200: "#4a5234",
          300: "#707a4d",
          400: "#95a367",
          500: "#bacc81",
          600: "#c8d69a",
          700: "#d6e0b3",
          800: "#e3ebcd",
          900: "#f1f5e6",
        },
        orangeAccent: {
          100: "#2f210d",
          200: "#5f411a",
          300: "#8e6228",
          400: "#be8235",
          500: "#eda342",
          600: "#f1b568",
          700: "#f4c88e",
          800: "#f8dab3",
          900: "#fbedd9",
        },
        khakiAccent: {
          100: "#27221e",
          200: "#4e453c",
          300: "#766759",
          400: "#9d8a77",
          500: "#c4ac95",
          600: "#d0bdaa",
          700: "#dccdbf",
          800: "#e7ded5",
          900: "#f3eeea",
        },
      }),
});

//material theme settings

export const themeSettings = (mode) => {
  //defining colors based on light or dark mode
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            //palette for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            nuetral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[600],
            },
          }
        : {
            //palette for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            nuetral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

//context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  //holding state to determine light or dark mode
  const [mode, setMode] = useState("dark");

  //use memo is allowing the caching of this result between renders
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  //determining the theme based on dark mode or light mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
