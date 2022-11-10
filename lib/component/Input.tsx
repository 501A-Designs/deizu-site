import React from 'react'
import { styled } from '../../stitches.config'

const InputStyled = styled('input', {
  outline: 'none',
  color: '$gray12',
  backgroundColor: '$gray3',
  border: '1px solid $gray4',
  padding: '$2',
  borderRadius: '$2',
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
  },
  '&:focus':{
    boxShadow: '$light',
    border: '1px solid $gray5',
  }
})

interface InputProp extends React.ComponentProps<typeof InputStyled>{
  fullWidth?:boolean,
}

export default function Input(props:InputProp) {
  return (
    <InputStyled
      fullWidth={props.fullWidth}
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      type={props.type ? props.type :'text'}
    />
  )
}
