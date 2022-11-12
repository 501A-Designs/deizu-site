import React from 'react'
import { styled } from '../../stitches.config'
import Stack from '../style/Stack'

const InputStyled = styled('input', {
  userSelect: 'none',
  outline:'none',
  color: '$gray12',
  transition: '$speed1',
  variants:{
    fullWidth: {
      true:{
        // width: '100%',
        textAlign: 'center',
      },
      false:{
        width: 'auto',
        textAlign: 'left',
      },
    },
    size:{
      standard:{
        backgroundColor: '$gray3',
        border: '1px solid $gray4',
        padding: '$2',
        borderRadius: '$2',
        '&:focus':{
          boxShadow: '$light',     
          backgroundColor: '$gray2',
          border: '1px solid $gray6',
        },
      },
      extraLarge:{
        backgroundColor: 'transparent',
        border: 'none',
        fontSize:'$xxl',
        padding: '$2',
        borderRadius: '$2',
      }
    }
  },
  defaultVariants:{
    size:'standard',
  }
})

interface InputProp extends React.ComponentProps<typeof InputStyled>{
  fullWidth?:boolean,
  subText?:JSX.Element
}

export default function Input(props:InputProp) {
  return (
    <InputStyled
      size={props.size}
      fullWidth={props.fullWidth}
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      type={props.type ? props.type :'text'}
    />
  )
}
