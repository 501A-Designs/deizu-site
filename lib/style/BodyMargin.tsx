import React from 'react'
import { styled } from '../../stitches.config'

const BodyMarginStyled = styled('div',{
	'@bp1':{
    padding:'5% 5%',
  },
	'@bp2':{
    padding:'3% 7%',
  },
	'@bp3':{
    padding:'4% 10%',
  },
	'@bp4':{
    padding:'4% 15%',
  },
})

export default function BodyMargin(props) {
  return <BodyMarginStyled>{props.children}</BodyMarginStyled>
}
