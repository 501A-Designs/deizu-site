import React from 'react'

export default function Button(props) {
    let width = 'fit-content';
    if (props.width === 'full') width = '100%';

    let buttonStyle = {
        width: width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        gap: '5px',
        borderRadius: '5px',
        padding: '10px 25px',
        outline: 'none',
        cursor: 'pointer',
        border: 'none',
        transition: '0.25s',
        color: 'white',
        backgroundColor: 'black'
    }
    return (
        <button
            disabled={props.disabled}
            onClick={props.onClick}
            style={Object.assign(
                buttonStyle,
                props.style
            )}
        >
            {props.icon}
            {props.children}
        </button>
    )
}
