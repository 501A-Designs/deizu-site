import { keyframes } from "@stitches/react";

const slideInBottom = keyframes({
  '0%': {
    opacity: 0,
		transform: 'translateY(0px) translateX(-50%) scale(0.5)',
  },
  // '30%': {
	// 	transform: 'translateY(-65%) translateX(-50%)',
  // },
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


export {slideInBottom,popOut, fadeIn};