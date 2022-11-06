import { keyframes } from "@stitches/react";

const slideInBottom = keyframes({
  '0%': {
    opacity: 0,
		transform: 'translateY(0px) translateX(-50%)',
  },
  '60%': {
    opacity: 1,
		transform: 'translateY(-55%) translateX(-50%)',
  },
});

const popOutLeftTop = keyframes({
  '0%': {
    transform: 'scale(0.5) translateX(-40%) translateY(-40%)',
    opacity: 0,
    borderRadius:'$3',
  },
  '50%':{
    transform: 'scale(1.03)'
  }
});


const popOut = keyframes({
  '0%': {
    transform: 'scale(0.5)',
    opacity: 0
  },
  '50%':{
    transform: 'scale(1.03)'
  }
});

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});


export {slideInBottom,popOutLeftTop,popOut, fadeIn};