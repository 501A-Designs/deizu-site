import { styled } from '@stitches/react';
import React from 'react'
import AlignItems from '../style/AlignItems'

export default function SectionButton(props) {
  const SectionButton = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'var(--system0)',
    borderRadius:'var(--borderRadius1)',
    height: 'fit-content',
    padding: '0.7em 0.8em',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover':{
      backgroundColor:'var(--system1)',
      transform: 'scale(1.01)'
    }
  });
  const LeftIcon = styled('span', {
    border: '1px solid var(--system0)',
    color: 'var(--txtColor1)',
    backgroundColor: 'var(--system3)',
    borderRadius: 'var(--borderRadius2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:'40px',
    height:'40px'
  });
  const RightIcon = styled('span', {
    color: 'var(--system3)',
    marginLeft: 'auto',
    fontSize: 'small',
    paddingRight: '15px'
  })

  return (
    <SectionButton onClick={props.onClick}>
      <AlignItems gap={'1em'}>
        <LeftIcon>{props.leftIcon}</LeftIcon>
        {props.children}
      </AlignItems>
      <RightIcon>{props.rightIcon}</RightIcon>
    </SectionButton>
  )
}