import React from 'react'

export default function ColorButton(props) {
    let colorButtonStyle = {
        backgroundColor:`${props.color}`,
        border:'1px solid transparent',
        width:'20px',
        height:'20px',
        borderRadius: 50
    }

    return (
        <button
            style={colorButtonStyle}
            onClick={props.onClick}
        />
    )
}