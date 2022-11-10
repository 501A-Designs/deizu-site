import React from 'react'
import { styled } from '../../stitches.config'
import AlignItems from '../style/AlignItems'

let TextPreviewStyled = styled('div',{
  backgroundColor: '$gray2',
  // boxShadow:'$light',
  border: '1px solid $gray5',
  borderRadius: '$2',
  overflowX:'scroll',
  width: 'max-width',
  minHeight: '50px',
  marginBottom:'$2',
  padding: '$2 $3'
})

export default function TextPreview({children}:React.ComponentProps<typeof TextPreviewStyled>) {
  return (
    <TextPreviewStyled>
      <AlignItems>
        {children}
      </AlignItems>
    </TextPreviewStyled>
  )
}
