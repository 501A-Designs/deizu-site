import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { styled } from '../../stitches.config'

const CreateNewButtonStyled = styled('button',{
  userSelect: 'none',
  outlineColor:'$gray12',
  cursor:'pointer',
  padding: '$3',
  fontSize:'$xxl',
  display:'flex',
  alignItems:'center',
  borderRadius:'$rounded',
  color: '$gray10',
  background: 'linear-gradient($gray2,$gray5)',
  border: '1px solid $gray5',
  transition:'$speed1',
  '&:hover': {
    background: 'linear-gradient($gray3,$gray6)',
    transform:'scale(1.06) rotate(360deg)',
    boxShadow: '$small',
    color: '$gray12',
  },
})

export default function CreateNewButton(props:React.ComponentProps<typeof CreateNewButtonStyled>) {
  return (
    <CreateNewButtonStyled onClick={props.onClick}>
      <FiPlus/>
    </CreateNewButtonStyled>
  )
}