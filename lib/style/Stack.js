import React from 'react'

export default function Stack(props) {
    let stackStyle ={
        display: 'grid',
        gridTemplateColumns:`${props.grid ? props.grid:'1fr'}`,
        gap: `${props.gap ? props.gap :'0.5em'}`
    }

    return (
        <div style={Object.assign(stackStyle,props.style)}>
            {props.children}
        </div>
    )
}
