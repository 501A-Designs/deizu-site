import React from 'react'

export default function GradientText(props) {
    let gradientText = {
        // backgroundImage: 'linear-gradient(90deg, #00a9e8, #24f300)',
	    // backgroundClip: 'text',
	    // color: 'transparent',
        width: 'fit-content',
        fontSize: props.fontSize,
        marginBottom: props.fontSize/2
    }
    return (
        <h1 style={gradientText}>{props.children}</h1>
    )
}
