import React from 'react'
import { styled } from '../../stitches.config';
import AlignItems from '../style/AlignItems'

const ThemeButtonStyled = styled('div', {
  borderRadius:'$2',
  padding: '0.5em',
  cursor: 'pointer',
  transition: '$speed1',
  'p':{
    padding: 0,
    margin: 0,
    height: 'fit-content',
    color:'$textColor1',
  },
  '&:hover':{
    backgroundColor:'$system2',
    transform: 'scale(1.03)'
  },
  variants:{
    currentTheme:{
      true:{
        backgroundColor:'$system2'
      },
      false:{
        backgroundColor:'$system1'
      }
    }
  }
});
const ThemePreviewStyled = styled('div', {
  borderRadius:'$1',
  width:'2.5em',
  height:'2.5em',
  border: '1px solid $system1',
  objectFit: 'cover',
})

interface ThemeButtonProps extends React.ComponentProps<typeof ThemeButtonStyled>{
  data?:string[],
  currentTheme?:string | string[],
}

export default function ThemeButton(props:ThemeButtonProps) {

  return (
    <ThemeButtonStyled
      onClick={props.onClick}
      currentTheme={props.currentTheme == props.data}
    >
      <AlignItems>
        <ThemePreviewStyled
          css={{
            background: `linear-gradient(45deg,${props.data[1]}, ${props.data[3]})`
          }}
        />
        <p>{props.children}</p>
      </AlignItems>
    </ThemeButtonStyled>
  )
}
