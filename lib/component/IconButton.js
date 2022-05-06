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
        borderRadius: 50,
        padding: '7px',
        fontSize: 18,
        outline: 'none',
        cursor: 'pointer',
        border: 'none',
        transition: '0.25s',
        color: 'var(--system3)',
        backgroundColor: 'var(--system0)',
        border: '1px solid var(--system2)',
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
