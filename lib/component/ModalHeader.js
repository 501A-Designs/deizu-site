import React from 'react'
import { isMobile } from 'react-device-detect'
import AlignItems from '../style/AlignItems'
import CloseButton from './CloseButton'

export default function ModalHeader(props) {
  return (
    <AlignItems
      style={{
        justifyContent: 'space-between',
        marginBottom:'0.5em'
      }}
    >
      <h4>{props.header}</h4>
      {isMobile &&
        <CloseButton onClick={props.onClick}>
          閉じる
        </CloseButton>
      }
    </AlignItems>
  )
}
