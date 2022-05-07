import React from 'react'

export default function ColorButton(props) {
    let colorButtonStyle = {
        backgroundColor:`${props.color}`,
        border:'1px solid transparent',
        width:`${props.width ? props.width :'20px'}`,
        height:'20px',
        borderRadius: 'var(--r5)',
        cursor: 'pointer'
    }

    return (
        <button
            style={colorButtonStyle}
            onClick={props.onClick}
        />
    )
}
