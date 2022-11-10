
import { keyframes } from '@stitches/react';
import React from 'react';
import { styled } from '../../../stitches.config';
import { TooltipLabel } from '../../component/TooltipLabel';
import { popOut } from '../../ux/keyframes';

const SideButtonStyled = styled('button', {
  fontSize:'$xm',
  padding:'$2',
  userSelect: 'none',
  outline: 'none',
  cursor: 'pointer',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:'$2',
  transition: '$speed1',
  variants:{
    selected:{
      true:{
        animation:`${popOut} 0.3s`,
        color: '$gray1',
        backgroundColor: '$gray12',
        border: '1px solid $gray12',
      },
      false:{
        color: '$gray12',
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        '&:hover': {
          transform:'scale(1.05)',
          backgroundColor: '$gray4',
          border: '1px solid $gray4',
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
