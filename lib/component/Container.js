import React from 'react'

export default function Container(props) {
    let containerStyle = {
        color: 'var(--txtColor0)',
        padding: '30px',
        backgroundColor: 'var(--system0)',
        borderRadius: 'var(--borderRadius2)',
        boxShadow: `${props.shadow ? props.shadow:'0 8px 30px rgba(0, 0, 0, 0.12)'}`,
        border:`${props.border ? props.border: '1px solid var(--system1)'}`,
        // minWidth: `${props.minWidth} && '300px'}`,
        // maxWidth: `${props.maxWidth} && '600px'`,
        // minWidth:'300px',
        // maxWidth:'600px',
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
