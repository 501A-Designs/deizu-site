import { createStitches } from '@stitches/react';

export const { styled, css, config } = createStitches({
  theme: {
    colors: {
      // Colors
      system1: 'white',
      system2: '#ececec',
      system3: '#dbdbdb',
      system4: 'black',

      // Text Color
      textColor1: 'black',
      textColor2: 'white',
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
      light:'0 3px 10px rgba(60, 60, 60, 0.12)',
      medium:'0 6px 20px rgba(20, 20, 20, 0.12)',
      heavy:'0 8px 30px rgba(0, 0, 0, 0.12)',
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
      s:'0.75em',
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