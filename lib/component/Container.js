import React from 'react'

export default function Container(props) {
    let containerStyle = {
        color: 'var(--txtColor0)',
        padding: '30px',
        borderRadius: 'var(--r10)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        minWidth: '300px',
        maxWidth: '600px',
        height: 'fit-content',
    }
    return (
        <div 
            style={Object.assign(
                containerStyle,
                props.style
            )}
        >
            {props.children}
        </div>
    )
}
