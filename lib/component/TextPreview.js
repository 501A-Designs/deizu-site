import React from 'react'

export default function TextPreview(props) {
    let textPreviewStyle ={
        backgroundColor: 'var(--system1)',
        border: '1px solid var(--system2)',
        borderRadius: 'var(--r5)',
        padding: '1em',
        overflowX:'scroll',
        width: 'max-width',
        height: 'min-height'
    }
    return (
        <div
        style={Object.assign(
            textPreviewStyle,
            props.style
        )}>{props.children}</div>
    )
}
