import React from 'react'

export default function ImageContainer(props) {
    let imageContainerStyle = {
        backgroundImage:`${props.src ? `url(${props.src})` :'none'}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor:`${props.src ? 'var(--system1)':'transparent'}`,
        padding: '20px 30px',
        border: `${props.src ? '1px solid var(--system2)':'none'}`,
        color: 'var(--txtColor0)',
        borderRadius: 'var(--r10)',
        objectFit: 'cover',
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
