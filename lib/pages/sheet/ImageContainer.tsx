import randomGradient from 'random-gradient'
import React,{useState} from 'react'
import { styled } from '../../../stitches.config'

const ImageContainerStyled = styled('div',{
  backgroundAttachment:'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '$gray12',
  textShadow:'$heavy',
  objectFit: 'cover',
})

const DisplayOnHover = styled('div',{
  opacity:'0',
  transition:'$speed1',
})

const ImageContainerOverlay = styled('div',{
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
  '&:hover':{
    [`& ${DisplayOnHover}`]: {
      opacity:'1'
    },
  }
})

const LargeHeading = styled('h1',{
  fontSize:'2em',
  margin:'0 0 15px 5%',
  color:'$gray12',
  fontWeight:'500',
  $$textShadowColor:'#989898',
  textShadow:'0px 0px 30px $$textShadowColor',
})

interface ImageContainerProps{
  src?:string,
  children:JSX.Element | JSX.Element[],
  id:string,
  title:string
}

export default function ImageContainer(props:ImageContainerProps) {
  return (
    <ImageContainerStyled
      css={{
        backgroundImage:`${props.src ? `url(${props.src})` :'none'}`,
        background:`${!props.src && randomGradient(props.id)}`,
        height: '250px',
      }}
    >
      <ImageContainerOverlay
        css={{
          height: '250px'
        }}
      >
        <LargeHeading>{props.title}</LargeHeading>
        <DisplayOnHover>{props.children}</DisplayOnHover>
      </ImageContainerOverlay>
    </ImageContainerStyled>
  )
}
