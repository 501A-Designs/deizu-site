import React from 'react'
import { styled } from '../../../stitches.config'

const ImageContainerStyled = styled('div',{
  backgroundAttachment:'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '$gray12',
  textShadow:'$heavy',
  objectFit: 'cover',
})

const ImageContainerOverlay = styled('div',{
  // backdropFilter:'blur(5px)',
  display:'flex',
  background:'linear-gradient(30deg, $gray3, transparent)',
  alignItems:'end',
  justifyContent:'space-between',
  width:'100%',
  borderBottom: '1px solid transparent',
  borderImage: 'linear-gradient(90deg, $gray1, $gray3)',
  borderImageSlice: 1,
  '@bp1':{
    padding:'0 5%',
  },
	'@bp2':{
    padding:'0 7%',
  },
	'@bp3':{
    padding:'0 10%',
  },
	'@bp4':{
    padding:'0 15%',
  },
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
        height: `${props.src ? '200px':'130px'}`,
      }}
    >
      <ImageContainerOverlay
        css={{
          height: `${props.src ? '200px':'130px'}`,
        }}
      >
        {props.children}
      </ImageContainerOverlay>
    </ImageContainerStyled>
  )
}
