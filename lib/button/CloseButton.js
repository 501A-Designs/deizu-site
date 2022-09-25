import React from 'react'
import { FiX } from 'react-icons/fi'
import AlignItems from '../style/AlignItems'

export default function CloseButton(props) {
  let colorButtonStyle = {
    backgroundColor:'var(--system1)',
    border:'1px solid transparent',
    width:'35px',
    height:'35px',
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 'var(--borderRadius2)',
    cursor: 'pointer'
  }

  return (
    <button
      style={colorButtonStyle}
      onClick={props.onClick}
      title={'閉じる'}
    >
      <AlignItems>
        <FiX/>
      </AlignItems>
    </button>
  )
}
