import React from 'react'
import { isMobile } from 'react-device-detect'
import AlignItems from '../style/AlignItems'
import CloseButton from '../button/CloseButton'

export default function ModalHeader(props:any) {
  return (
    <AlignItems
      justifyContent={'spaceBetween'}
      marginBottom={'small'}
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
