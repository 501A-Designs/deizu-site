import React from 'react'

export default function Button(props) {
    let width = 'fit-content';
    if (props.width === 'full') width = '100%';

    let iconButtonStyle = {
        width: width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        gap: '5px',
        borderRadius: '50px',
        padding: '7px',
        fontSize: 18,
        outline: 'none',
        cursor: 'pointer',
        border: 'none',
        transition: '0.25s',
        color: 'grey',
        backgroundColor: '#F0F0F0'
    }
    return (
        <button
            onClick={props.onClick}
            style={Object.assign(
                iconButtonStyle,
                props.style
            )}
            title={props.children}
        >
            {props.icon}
        </button>
    )
}
