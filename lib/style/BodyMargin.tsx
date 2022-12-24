import React from 'react'
import { styled } from '../../stitches.config'

const BodyMarginStyled = styled('div',{
	'@bp1':{
    padding:'5% 5% 0 5%',
  },
	'@bp2':{
    padding:'3% 7% 0 7%',
  },
	'@bp3':{
    padding:'4% 10% 0 10%',
  },
	'@bp4':{
    padding:'4% 15% 0 15%',
  },
  backgroundColor:'$gray1',
})

export default function BodyMargin(props:any | JSX.Element | JSX.Element[]) {
  return <BodyMarginStyled css={{minHeight:props.minHeight}}>{props.children}</BodyMarginStyled>
}
