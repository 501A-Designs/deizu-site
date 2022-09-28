import { styled } from '@stitches/react'
import React from 'react'
import AlignItems from '../style/AlignItems'

export default function Notice(props) {
  const Notice = styled('div',{
    backgroundColor: 'var(--system3)',
    color: 'var(--txtColor1)',
    borderRadius: '50px',
    padding: '2.5px 7px',
    'span': {
      
    }
  })
  return (
    <AlignItems style={{justifyContent: 'center'}}>
      <Notice>
        <div>{props.icon}</div>
        <span>{props.children}</span>
      </Notice>
    </AlignItems>
  )
}
