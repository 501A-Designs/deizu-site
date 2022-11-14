import React from 'react'
import { styled } from '../../stitches.config'

let TextPreviewStyled = styled('div',{
  display:'flex',
  alignItems:'center',
  backgroundColor: '$gray2',
  border: '1px solid $gray5',
  borderRadius: '$2',
  overflowX:'scroll',
  width: 'max-width',
  minHeight: '50px',
  padding: '$2 $3',
  variants:{
    justifyContent:{
      center:{justifyContent:'center'},
      spaceBetween:{justifyContent:'space-between'},
      right:{justifyContent:'flex-end'},
    },
  },
  defaultVariants:{
    justifyContent:'center'
  }
})

interface TextPreviewProps extends React.ComponentProps<typeof TextPreviewStyled>{
  margin?:string
}

export default function TextPreview(props:TextPreviewProps) {
  return (
    <TextPreviewStyled
      justifyContent={props.justifyContent}
      css={{
        margin:`${props.margin}`
      }}
    >
      {props.children}
    </TextPreviewStyled>
  )
}
