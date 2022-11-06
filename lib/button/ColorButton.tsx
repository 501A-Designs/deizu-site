import { styled } from '@stitches/react'
import React from 'react'

const ColorButtonStyled = styled('button', {
  height:'20px',
  width:'20px',
  borderRadius: '$2',
  cursor: 'pointer',
  variants:{
    selected:{
      true:{
        $$shadowColor: '$system2',
        boxShadow: '0 0 0 1px $$shadowColor',
        border:'2px solid $system1',
      },
      false:{
        border:'1px solid transparent',
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
