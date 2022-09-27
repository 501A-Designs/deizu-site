import { styled } from '@stitches/react'
import React from 'react'

export default function ColorButton(props) {
    const ColorButton = styled('button', {
        backgroundColor:`${props.color}`,
        width:`${props.width ? props.width :'20px'}`,
        border:'1px solid transparent',
        height:'20px',
        borderRadius: 'var(--borderRadius0)',
        cursor: 'pointer'
    })

    return (
        <ColorButton
            key={props.key}
            onClick={props.onClick}
        />
    )
}
