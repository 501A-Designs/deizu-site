import {
  whiteA,
  blackA,
  gray,
  grayDark,
  blue,
  blueDark,
  red,
  redDark,
  green,
  greenDark,
  orange,
  orangeDark,
  amber,
  amberDark,
  pink,
  pinkDark,
  brown,
  brownDark,
  purple,
  purpleDark,
} from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

export const { styled, css, createTheme } = createStitches({
  theme: {
    colors: {
      // system1: '$gray1',
      // system2: '$gray4',
      // system3: '$gray7',
      // system4: '$gray12',
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...orange,
      ...amber,
      ...pink,
      ...brown,
      ...purple,
    },
    space:{
      1:'5px',
      2:'10px',
      3:'20px',
      4:'30px',
    },
    radii: {
      1:'7px',
      2:'12px',
      3:'20px',
      rounded:'9999px',
    },
    shadows:{
      light:'0 3px 10px rgba(150, 150, 150, 0.12)',
      medium:'0 6px 15px rgba(140, 140, 140, 0.12)',
      heavy:'0 8px 20px rgba(130, 130, 130, 0.12)',
    },
    transitions:{
      speed1: '0.3s',
      speed2: '0.8s',
      speed3: '1.0s',
    },
    fontSizes:{
      xxl:'1.5em',
      xl:'1.1em',
      l:'1em',
      xm:'0.9em',
      m:'0.8em',
      s:'0.7em',
    },
  },
  media: {
    bp1: '(max-width: 700px)',
    bp2: '(min-width: 701px) and (max-width: 1000px)',
    bp3: '(min-width: 1001px) and (max-width: 1270px)',
    bp4: '(min-width: 1271px)',

    // Combined media query
    bp1_2: '(max-width: 1000px)',
    bp2_3: '(min-width: 701px) and (max-width: 1270px)',
    bp1_3: '(max-width: 1270px)',
    bp2_: '(min-width: 701px)',
    bp3_: '(min-width: 1001px)',
  },
  // utils: {
  //   marginX: (value) => ({ marginLeft: value, marginRight: value }),
  // },
});

export const darkTheme = createTheme({
  colors: {
    // system1: '$grayDark1',
    // system2: '$grayDark4',
    // system3: '$grayDark7',
    // system4: '$grayDark12',
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...orangeDark,
    ...amberDark,
    ...pinkDark,
    ...brownDark,
    ...purpleDark,
  },
});