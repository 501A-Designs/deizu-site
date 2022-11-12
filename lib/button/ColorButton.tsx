import { styled } from '@stitches/react'
import React from 'react'

const ColorButtonStyled = styled('button', {
  userSelect: 'none',
  outlineColor:'$gray12',
  height:'20px',
  width:'20px',
  borderRadius: '$2',
  cursor: 'pointer',
  variants:{
    selected:{
      true:{
        border:'2px solid $system4',
      },
      false:{
        border:'2px solid transparent',
      }
    }
  },
  defaultVariants:{
    selected:'false'
  }
})

interface ColorButtonProps extends React.ComponentProps<typeof ColorButtonStyled>{
  color:string,
}

export default function ColorButton(props:ColorButtonProps) {
  return (
    <ColorButtonStyled
      onClick={props.onClick}
      selected={props.selected}
      css={{backgroundColor:`${props.color}`}}
    />
  )
}
