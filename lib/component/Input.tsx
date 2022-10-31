import React from 'react'
import { styled } from '../../stitches.config'

const InputStyled = styled('input', {
  outline: 'none',
  color: '$txtColor1',
  backgroundColor: '$system1',
  padding: '$2',
  border: '1px solid $system2',
  borderRadius: '$2',
  transition: '$2',
  variants:{
    fullWidth: {
      true:{
        width: '100%',
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
