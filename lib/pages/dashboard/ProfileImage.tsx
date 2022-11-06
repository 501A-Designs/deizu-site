import Image from 'next/image'
import React from 'react'
import { styled } from '../../../stitches.config'

const ProfileImageStyled = styled(Image, {
  borderRadius:'$rounded',
  cursor:'pointer',
  transition:'$speed1',
  '&:hover':{
    opacity: '0.5'
  }
})

export default function ProfileImage(props:any) {
  return (
    <ProfileImageStyled
      width={props.width}
      height={props.height}
      src={props.src}
      onClick={props.onClick}
    />
  )
}
