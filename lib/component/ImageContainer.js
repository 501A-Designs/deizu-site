import React from 'react'

export default function ImageContainer(props) {
    let imageContainerStyle = {
        backgroundImage:`${props.src ? `url(${props.src})` :'none'}`,
        backgroundColor:'var(--system1',
        padding: '30px',
        border: '1px solid var(--system1)',
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
