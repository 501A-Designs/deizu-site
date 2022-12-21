import Link from 'next/link'
import React from 'react'
import { styled } from '../../stitches.config'

const LinkStyled = styled(Link,{
  cursor:'pointer',
  color:'$gray12',
  textDecoration:'underline',
  textDecorationColor:'$gray9'
})


export default function LinkTag(props:React.ComponentProps<typeof Link>) {
return (
    <LinkStyled
      href={props.href}
      target={props.target}
      rel={props.rel}
    >
      {props.children}
    </LinkStyled>
  )
}
