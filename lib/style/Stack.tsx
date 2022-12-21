import React from "react"
import { styled } from "../../stitches.config"

let StackStyled = styled('div',{
  display: 'grid',
  height: 'fit-content',
})

interface StackProp extends React.ComponentProps<typeof StackStyled>{
  grid?: string,
  gap?: string,
  margin?:string
}

export default function Stack(props:StackProp) {
  return (
    <StackStyled
      css={{
        margin:`${props.margin}`,
        gridTemplateColumns:`${props.grid ? props.grid:'1fr'}`,
        gap: `${props.gap ? props.gap :'$1'}`,
      }}
    >
      {props.children}
    </StackStyled>
  )
}
