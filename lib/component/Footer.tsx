import React from 'react'

import { styled } from '../../stitches.config';

let FooterStyled = styled('footer',{
    position: 'sticky',
    bottom: 0,
    height: 'fit-content',
})

export default function Footer(props:any) {
  return (
    <FooterStyled css={props.css}>
      {props.children}
    </FooterStyled>
  )
}
