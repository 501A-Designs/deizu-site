import React from 'react'
import { styled } from '../../../stitches.config'

const ImageContainerStyled = styled('div',{
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '20px 30px',
  color: '$textColor1',
  borderRadius: '$3',
  objectFit: 'cover',
  height: 'fit-content',
})

interface ImageContainerProps{
  src?:string,
  children:JSX.Element | JSX.Element[]
}


export default function ImageContainer(props:ImageContainerProps) {
  return (
    <ImageContainerStyled
      css={{
        backgroundImage:`${props.src ? `url(${props.src})` :'none'}`,
        backgroundColor:`${props.src ? '$system2':'transparent'}`,
        border: `${props.src ? '1px solid $system3':'none'}`,
      }}
    >
        {props.children}
    </ImageContainerStyled>
  )
}
