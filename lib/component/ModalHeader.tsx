import React from 'react'
import { isMobile } from 'react-device-detect'
import AlignItems from '../style/AlignItems'
import Button from '../button/Button'
import { FiX } from 'react-icons/fi'

export default function ModalHeader(props:any) {
  return (
    <AlignItems
      justifyContent={'spaceBetween'}
      marginBottom={'small'}
    >
      <h4>{props.header}</h4>
      {isMobile &&
        <Button
          icon={<FiX/>}
          size={'icon'}
          onClick={props.onClick}
        >
          閉じる
        </Button>
      }
    </AlignItems>
  )
}
