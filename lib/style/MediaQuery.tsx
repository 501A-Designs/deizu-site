import React from 'react'
import { styled } from '../../stitches.config'

const MediaQueryStyled = styled('div',{
  variants:{
    hide:{
      desktop:{
        '#mobile':{
          display:'block'
        },
        '#desktop':{
          '@bp3':{
            display:'none'
          },
          '@bp4':{
            display:'none'
          }
        }
      },
      mobile:{
        '#mobile':{
          '@bp1':{
            display:'none'
          },
          '@bp2':{
            display:'none'
          }  
        },
        '#desktop':{
          display:'block'      
        }
      }
    }
  }
})

export default function MediaQuery({hide,children}:React.ComponentProps<typeof MediaQueryStyled>) {
  return (
    <MediaQueryStyled hide={hide}>
      <div id='mobile'>{children}</div>
      <div id='desktop'>{children}</div>
    </MediaQueryStyled>
  )
}
