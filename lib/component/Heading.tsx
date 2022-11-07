import React from 'react'
import { styled } from '../../stitches.config'

const HeadingStyled = styled('h1',{
  color:'$system4',
	margin: '0.3em 0 0.3em 0',

  variants:{
    type:{
      h1:{
        fontSize:'$xxl'
      },
      h2:{
        fontSize:'$xl'
      },
      h3:{
        fontSize:'$l'
      },
      h4:{
        fontSize:'$xm'
      },
      h5:{
        fontSize:'$m'
      },
      h6:{
        fontSize:'$s'
      }
    },
  }
})

interface HeadingProps extends React.ComponentProps<typeof HeadingStyled>{
  margin?:string
}

export default function Heading(props:HeadingProps) {
  return (
    <HeadingStyled
      type={props.type}
      css={{
        margin:props.margin
      }}
    >
      {props.children}
    </HeadingStyled>
  )
}
