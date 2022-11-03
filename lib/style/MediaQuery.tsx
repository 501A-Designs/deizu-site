import React from 'react'
import { styled } from '../../stitches.config'

const MediaQueryStyled = styled('div',{
  display:'block',
  variants:{
    hide:{
      mobile:{
        '@bp1':{
          display:'none'
        },
        '@bp2':{
          display:'none'
        }
      },
      desktop:{
        '@bp3':{
          display:'none'
        },
        '@bp4':{
          display:'none'
        }
      }
    }
  }
})

export default function MediaQuery({hide,children}:React.ComponentProps<typeof MediaQueryStyled>) {
  return (
    <MediaQueryStyled hide={hide}>
      {children}
    </MediaQueryStyled>
  )
}
