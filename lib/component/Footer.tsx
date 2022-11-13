import React from 'react'

import { styled } from '../../stitches.config';

let FooterStyled = styled('footer',{
  position: 'sticky',
  bottom: 0,
  height: 'fit-content',
  variants:{
    shadow:{
      true:{
        background: 'radial-gradient(at bottom, $gray2,transparent 50%)',
        backgroundPosition:'bottom',
        paddingBottom:'2em'
      }
    }
  }
})

export default function Footer(props:any) {
  return (
    <FooterStyled css={props.css} shadow={props.shadow}>
      {props.children}
    </FooterStyled>
  )
}
