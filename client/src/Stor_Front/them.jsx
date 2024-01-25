import React from "react";
import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          search: {
            main: "#e4e4e4",
          },
          bg: {
            main: "#F6F6F6",
          },
          bg1: {
            main: "fff",
            header2: "#e4e4e4",
            header3: "#e4e4e49e",
          },

          text: {
            primary: "#2B3445",
          },
          neutral: {
            main: "#64748B",
          },

          favColor: {
            main: grey[300],
          },
          header2: {
            bgcolor: "#e4e4e4", //theme.palette.header2.bgcolor
            icons: "rgb(105 105 105)", //theme.palette.header2.icons
            logo: "#2B3445", //theme.palette.header2.logo
          },
          header3: {
            bgcolor: "#edededdb",
            categoriesBox: "#e4e4e4", //theme.palette.header3.categoriesBox
            categoriesText: "grey", //theme.palette.header3.categoriesText
            categoriesIcon: "#2b3445", //theme.palette.header3.categoriesIcon
            categoriesBoxSelected: "white", //theme.palette.header3.categoriesBoxSelected
            categoriesSelectedText: "rgb(43, 52, 69)", //theme.palette.header3.categoriesSelectedText
            categoriesSelectedTextHover: "whitesmoke", //theme.palette.header3.categoriesSelectedTextHover
          },
          section1: {
            leftSide: "#16181a", //theme.palette.section1.leftSide
            rightSide: "#e8e5df", //theme.palette.section1.rightSide
            smallScreen: {
              title: "rgb(43 52 69)", //theme.palette.section1.smallScreen.title
              subtitle: "rgb(210, 63, 87)", //theme.palette.section1.smallScreen.subtitle
              paragraph: "grey", //theme.palette.section1.smallScreen.paragraph
              bg: "rgb(189, 188, 184)", //theme.palette.section1.smallScreen.bg
            },
          },
          iconSection: {
            icons: "#364050", //theme.palette.iconSection.icons
            bgcolorPink: "#e8dfd8", //theme.palette.iconSection.bgcolorPink
            text: "black", //theme.palette.iconSection.text
            title: "#2b3445", //theme.palette.iconSection.title
            buttonBG: "rgb(115, 46, 75)", //theme.palette.iconSection.buttonBG
            buttonText: "whitesmoke", //theme.palette.iconSection.buttonText
            buttonBorder: "rgb(115, 46, 75)", //theme.palette.iconSection.buttonBorder
          },
          section4: {
            title: "#dd631c", //theme.palette.section4.title
            subtitle: "black", //theme.palette.section4.subtitle
            box1: {
              title: "rgb(81 81 80)", //theme.palette.section4.box1.title
              subtitleBG: "rgb(189, 188, 187)", //theme.palette.section4.box1.subtitleBG
            },
            box2: {
              title: "rgb(157 69 41)", //theme.palette.section4.box2.title
              subtitleBG: "rgb(230, 172, 126)", //theme.palette.section4.box2.subtitleBG
            },
            box3: {
              title: "rgb(109 91 64)", //theme.palette.section4.box3.title
              subtitleBG: "rgb(231, 190, 127)", //theme.palette.section4.box3.subtitleBG
            },
            box4: {
              title: "rgb(181 80 122)", //theme.palette.section4.box4.title
              subtitleBG: "rgb(237, 206, 219)", //theme.palette.section4.box4.subtitleBG
            },
          },
          sectionprd: {
            bgcolor: "white", //theme.palette.sectionprd.bgcolor
          },
        }
      : {
          // palette values for dark mode
          neutral: {
            main: "#64748B",
          },
          search: {
            main: "#252b32",
          },
          bg: {
            main: "#1D2021",
          },
          bg1: {
            main: "#000000",
          },
          favColor: {
            main: grey[800],
          },
          text: {
            primary: "#fff",
          },
          header2: {
            bgcolor: "#1f232b", //theme.palette.header2.bgcolor
            icons: "#e8e5df", //theme.palette.header2.icons
            logo: "#e8e5df", //theme.palette.header2.logo
          },
          header3: {
            bgcolor: "#16181a",
            categoriesBox: "#1f262c", //theme.palette.header3.categoriesBox
            categoriesText: "#e8e5df", //theme.palette.header3.categoriesText
            categoriesIcon: "#e8e5df", //theme.palette.header3.categoriesIcon
            categoriesBoxSelected: "#e8e5df", //theme.palette.header3.categoriesBoxSelected
            categoriesSelectedText: "rgb(43, 52, 69)", //theme.palette.header3.categoriesSelectedText
            categoriesSelectedTextHover: "whitesmoke", //theme.palette.header3.categoriesSelectedTextHover
          },
          section1: {
            leftSide: "rgb(24 63 94)", //theme.palette.section1.leftSide
            rightSide: "#16181a", //theme.palette.section1.rightSide
            smallScreen: {
              title: "#e8e5df", //theme.palette.section1.smallScreen.title
              subtitle: "rgb(210, 63, 87)", //theme.palette.section1.smallScreen.subtitle
              paragraph: "grey", //theme.palette.section1.smallScreen.paragraph
              bg: "black", //theme.palette.section1.smallScreen.bg
            },
          },
          iconSection: {
            icons: "#183f5e", //theme.palette.iconSection.icons
            bgcolorPink: "#000", //theme.palette.iconSection.bgcolorPink
            text: "whitesmoke", //theme.palette.iconSection.text
            title: "#a5446f", //theme.palette.iconSection.title
            buttonBG: "black", //theme.palette.iconSection.buttonBG
            buttonText: "whitesmoke", //theme.palette.iconSection.buttonText
            buttonBorder: "#a84571", //theme.palette.iconSection.buttonBorder
          },
          section4: {
            title: "#dd631c", //theme.palette.section4.title
            subtitle: "white", //theme.palette.section4.subtitle
            box1: {
              title: "rgb(81 81 80)", //theme.palette.section4.box1.title
              subtitleBG: "rgb(81 81 80)", //theme.palette.section4.box1.subtitleBG
            },
            box2: {
              title: "rgb(157 69 41)", //theme.palette.section4.box2.title
              subtitleBG: "rgb(157 69 41)", //theme.palette.section4.box2.subtitleBG
            },
            box3: {
              title: "rgb(109 91 64)", //theme.palette.section4.box3.title
              subtitleBG: "rgb(109 91 64)", //theme.palette.section4.box3.subtitleBG
            },
            box4: {
              title: "rgb(181 80 122)", //theme.palette.section4.box4.title
              subtitleBG: "rgb(181 80 122)", //theme.palette.section4.box4.subtitleBG
            },
          },
          sectionprd: {
            bgcolor: "black", //theme.palette.sectionprd.bgcolor
          },
        }),
  },
});

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(
    localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return [theme, colorMode];
};
