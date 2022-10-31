import { keyframes } from "@stitches/react";

const slideInButton = keyframes({
  '0%': {
    opacity: 0,
		transform: 'translateY(0px) translateX(-50%)',
  },
  '60%': {
    opacity: 1,
		transform: 'translateY(-55%) translateX(-50%)',
  },
});

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});


export {slideInButton, fadeIn};