import React from 'react'
import { styled } from '../../stitches.config'

const KbdStyled = styled('kbd',{
  background:'linear-gradient($gray1,$gray5)',
  border:'1px solid $gray5',
  padding:'0 $1',
  color:'$gray11',
  borderRadius:'5px',
})

export default function Key({children}:any) {
  return (
    <KbdStyled>{children}</KbdStyled>
  )
}
