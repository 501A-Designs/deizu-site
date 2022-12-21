import Image from 'next/image'
import React from 'react'
import { styled } from '../../../stitches.config'

const ProfileImageStyled = styled(Image, {
  borderRadius:'$rounded',
  cursor:'pointer',
  transition:'$speed1',
  '&:hover':{
    opacity: '0.5'
  },
  variants:{
    marginBottom:{
      small:{marginBottom:'0.5em'},
      medium:{marginBottom:'1em'},
      large:{marginBottom:'2em'},
      extraLarge:{marginBottom:'3em'},
    }
  }
})
// React.ComponentProps extends
export default function ProfileImage(props:any) {
  return (
    <ProfileImageStyled
      width={props.width}
      height={props.height}
      src={props.src}
      onClick={props.onClick}
      marginBottom={props.marginBottom}
      alt="Picture of the author"
    />
  )
}
