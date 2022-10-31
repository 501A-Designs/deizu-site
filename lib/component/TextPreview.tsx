import React from 'react'
import { styled } from '../../stitches.config'

let TextPreviewStyled = styled('div',{
  backgroundColor: '$system2',
  border: '1px solid $system3',
  borderRadius: '$2',
  overflowX:'scroll',
  width: 'max-width',
  height: 'min-height',
  marginBottom:'$2',
  variants:{
    padding:{
      medium:{
        padding: '$2 $3'
      },
      small:{
        padding: '$1 $2'
      }
    }
  },
  defaultVariants:{
    padding:'medium'
  }
})

export default function TextPreview({padding, children}:React.ComponentProps<typeof TextPreviewStyled>) {
  return (
    <TextPreviewStyled
      padding={padding}
    >
      {children}
    </TextPreviewStyled>
  )
}
