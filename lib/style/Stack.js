import React from 'react'

export default function Stack(props) {
    let stackStyle ={
        display: 'grid',
        gridTemplateColumns:'1fr',
        gap: `${props.gap ? props.gap :'0.5em'}`
    }

    return (
        <div style={stackStyle}>
            {props.children}
        </div>
    )
}