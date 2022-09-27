import { styled } from '@stitches/react'
import React from 'react'

export default function ImageSelect(props) {
  const ImageContainer = styled('div',{
    width:'fit-content',
    height:'min-height',
    borderRadius: 'calc(var(--borderRadius2)/1.5)',
    border:`1px solid ${props.selected ? 'var(--system1)':'var(--system0)'}`,
    backgroundColor:`${props.selected ? 'var(--system1)':'var(--system0)'}`,
    padding:'5px',
    '&:hover':{
      opacity: 0.8
    }
  })
  const Image = styled('img',{
    width:'100%',
    height:'100%',
    borderRadius: 'var(--borderRadius1)',
    border:'1px solid var(--system1)'
  })

  return (
    <ImageContainer>
      <Image
        src={props.src}
        alt={props.alt}
        onClick={props.onClick}
      />
    </ImageContainer>
  )
}
