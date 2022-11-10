import React from 'react'
import { styled } from '../../../stitches.config'

const ImageContainerStyled = styled('div',{
  backgroundAttachment:'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '$gray12',
  textShadow:'$heavy',
  objectFit: 'cover',
  height: '200px',
})

const ImageContainerOverlay = styled('div',{
  // backdropFilter:'blur(5px)',
  background:'linear-gradient(to top, transparent)',
  height: '200px',
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
        backgroundColor:`${props.src ? '$gray2':'transparent'}`,
        border: `${props.src ? '1px solid $gray3':'none'}`,
      }}
    >
      <ImageContainerOverlay/>
      {props.children}
    </ImageContainerStyled>
  )
}
