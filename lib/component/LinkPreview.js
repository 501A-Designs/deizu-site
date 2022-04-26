import React from 'react'

export default function LinkPreview(props) {
    let linkPreviewStyle ={
        backgroundColor: '#f0f0f0',
        padding: '1em',
        overflowX:'scroll',
        width: 'max-width',
        height: 'min-height'
    }
    return (
        <p style={linkPreviewStyle}>{props.children}</p>
    )
}
