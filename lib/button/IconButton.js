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
        borderRadius: 'var(--borderRadius1)',
        padding: '7px',
        fontSize: '15px',
        outline: 'none',
        cursor: 'pointer',
        border: 'none',
        transition: '0.25s',
        color: `${props.fill ? 'var(--txtColor1)':'var(--txtColor0)'}`,
        backgroundColor: `${props.fill ? 'var(--system3)':'var(--system0)'}`,
        border: `${props.fill ? '1px solid var(--system3)' :'1px solid var(--system2)'}`,
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
