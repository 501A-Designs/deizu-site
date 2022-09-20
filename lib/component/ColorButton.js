import React from 'react'

export default function ColorButton(props) {
    let colorButtonStyle = {
        backgroundColor:`${props.color}`,
        border:'1px solid transparent',
        width:`${props.width ? props.width :'20px'}`,
        height:'20px',
        borderRadius: 'var(--borderRadius0)',
        cursor: 'pointer'
    }

    return (
        <button
            key={props.key}
            style={colorButtonStyle}
            onClick={props.onClick}
        />
    )
}
