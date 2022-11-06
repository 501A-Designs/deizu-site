
import { keyframes } from '@stitches/react';
import React from 'react';
import { styled } from '../../../stitches.config';
import { TooltipLabel } from '../../component/TooltipLabel';

const SideButtonStyled = styled('button', {
  fontSize:'$xm',
  padding:'$2',
  userSelect: 'none',
  outline: 'none',
  cursor: 'pointer',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  transition: '$speed1',
  borderRadius:'$2',
  variants:{
    selected:{
      true:{
        color: '$textColor2',
        backgroundColor: '$system4',
        border: '1px solid $system4',
      },
      false:{
        color: '$textColor1',
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        '&:hover': {
          transform:'scale(1.05)',
          backgroundColor: '$system2',
          border: '1px solid $system2',
        },
      },
    },
  },
  defaultVariants:{
    selected:'false',
  }
})

const popOutLeft = keyframes({
  '0%': {
    transform: 'scale(0.5) translateX(-40%)',
    opacity: 0,
  },
  '50%':{
    transform: 'scale(1.03)'
  }
});


interface SideButtonProps extends React.ComponentProps<typeof SideButtonStyled>{
  icon: any,
}

export default function SideButton(props:SideButtonProps) {
  return (
    <TooltipLabel
      trigger={
        <SideButtonStyled
          onClick={props.onClick}
          selected={props.selected}
        >
          {props.icon}
        </SideButtonStyled>
      }
      side={'right'}
      keyframes={popOutLeft}
    >
      {props.children}
    </TooltipLabel>
  )
}
