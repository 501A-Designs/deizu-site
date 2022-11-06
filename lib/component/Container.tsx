import React from 'react'
import { styled } from '../../stitches.config'

let ContainerStyled = styled('div',{
  color: '$textColor1',
  height: 'fit-content',
  variants:{
    styleType:{
      standard:{
        backgroundColor: '$system1',
        border:'1px solid $system2',
        boxShadow: '$heavy',
      },
      filled:{
        backgroundColor: '$system2',
        border:'1px solid $system3',
      },
      transparent:{
        background:'transparent',
        border:'1px solid transparent',
      },
    },
    index:{
      outer:{
        borderRadius: '$3',
        padding: '$4',
      },
      inner:{
        borderRadius: '$2',
        padding: '$3',
      }
    }
  },
  defaultVariants:{
    styleType:'standard',
    index:'outer'
  }
})

interface ContainerProps extends React.ComponentProps<typeof ContainerStyled> {
  // styleType?: string,
  // index?: string,
  xDegree?: string,
  yDegree?: string,
  maxWidth?: string,
  maxHeight?: string,
  marginBottom?: string,
  marginTop?: string,
  // children: JSX.Element | JSX.Element[],
}

export default function Container(props:ContainerProps) {
  return (
    <ContainerStyled
      styleType={props.styleType}
      index={props.index}
      css={{
        transform: `
          perspective(200px)
          rotateX(${props.xDegree ? props.xDegree: 0})
          rotateY(${props.yDegree ? props.yDegree: 0})
        `,
        maxWidth:`${props.maxWidth}`,
        maxHeight:`${props.maxHeight}`,
        marginBottom:`${props.marginBottom}`,
        marginTop:`${props.marginTop}`,
      }}
    >
      {props.children}
    </ContainerStyled>
  )
}
