import { styled } from '@stitches/react';
import React,{useState} from 'react'
import AlignItems from '../style/AlignItems'

export default function SectionButton(props) {
  const [hovered, setHovered] = useState(false);
  const SectionButton = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:`${hovered ? 'var(--system1)':'var(--system0)'}`,
    borderRadius:'var(--borderRadius1)',
    height: 'fit-content',
    padding: '0.7em 0.8em',
    cursor: 'pointer',
    transition: '0.3s'
  });
  const LeftIcon = styled('span', {
    border: '1px solid var(--system0)',
    color: 'var(--txtColor1)',
    backgroundColor: 'var(--system3)',
    borderRadius: 'var(--borderRadius2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:'40px',
    height:'40px'
  });
  const RightIcon = styled('span', {
    color: 'var(--system3)',
    marginLeft: 'auto',
    fontSize: 'small',
    paddingRight: '15px'
  })

  return (
    <SectionButton
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      onClick={props.onClick}
    >
      <AlignItems gap={'1em'}>
        <LeftIcon>{props.leftIcon}</LeftIcon>
        {props.children}
      </AlignItems>
      <RightIcon>{props.rightIcon}</RightIcon>
    </SectionButton>
  )
}