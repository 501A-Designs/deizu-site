import React from 'react'

export default function ImageContainer(props) {
    let imageContainerStyle = {
        backgroundImage:`${props.src ? `url(${props.src})` :'none'}`,
        backgroundColor:`${props.src ? 'var(--system1)' : 'var(--system0'}`,
        padding: `${props.src ? '30px' : '0px'}`,
        border: `${props.src ? '1px solid var(--system1)' : 'none'}`,
        color: 'var(--txtColor0)',
        borderRadius: 'var(--r10)',
        objectFit: 'cover',
        // boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        // minWidth: '300px',
        // maxWidth: '600px',
        height: 'fit-content',
    }
    return (
        <div 
            style={Object.assign(
                imageContainerStyle,
                props.style
            )}
        >
            {props.children}
        </div>
    )
}
