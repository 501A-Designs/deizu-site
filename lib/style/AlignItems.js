import React from 'react'

export default function AlignItems(props) {
    let alignItems = {
        display:'flex',
        alignItems:'center',
        gap: `${props.gap ? props.gap :'0.5em'}`        
    }
    return (
        <div
            style={Object.assign(
                alignItems,
                props.style
            )}
            className={props.className}
        >
            {props.children}
        </div>
    )
}
