import React from 'react';
import { styled } from '@stitches/react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

const SwitchStyled = styled(SwitchPrimitive.Root, {
  userSelect: 'none',
  outlineColor:'$gray12',
  cursor:'pointer',
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: '$gray6',
  borderRadius: '$rounded',
  position: 'relative',
  boxShadow: '$small',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&[data-state="checked"]': {
    backgroundColor: '$gray12',
    boxShadow: '$medium',
  },
});

const SwitchThumbStyled = styled(SwitchPrimitive.Thumb, {
  userSelect: 'none',
  outlineColor:'$gray12',
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: '$gray1',
  borderRadius: '$rounded',
  boxShadow: `0 2px 2px $gray1`,
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': {
    transform: 'translateX(19px)'
  },
});

export default function Toggle(props:any){
  return(
    <SwitchStyled
      // id="s1"
      defaultChecked={props.defaultChecked}
      onCheckedChange={props.onClick}
    >
      <SwitchThumbStyled />
    </SwitchStyled>
  )
};