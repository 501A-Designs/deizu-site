import React from 'react'
import { FiEdit3, FiImage } from 'react-icons/fi'
import { styled } from '../../../stitches.config'
import Menu, { ItemStyled } from '../../component/Menu'
import AlignItems from '../../style/AlignItems'

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
  children:JSX.Element | JSX.Element[],
  menuChildren:JSX.Element | JSX.Element[],
}


export default function ImageContainer(props:ImageContainerProps) {
  return (

    <Menu
      title={'基本設定'}
      trigger={
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
      }
    >
      {props.menuChildren}
    </Menu>
  )
}
