import React from 'react'

export default function Button(props) {
    let width = 'fit-content';
    if (props.width === 'full') width = '100%';

    let buttonStyle = {
        width: width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        gap: '5px',
        borderRadius: '5px',
        padding: '10px 25px',
        // fontWeight: 'bold',
        outline: 'none',
        cursor: 'pointer',
        border: 'none',
        transition: '0.25s',
        /* background-color: #e2e2e2; */
        /* color: black; */
        color: 'white',
        backgroundColor: 'black'
        // transform: scale3d(1.05, 1.05, 1.05);
        // box-shadow: 0px 1px 20px #f3f3f3;
    }
    return (
        <button
            onClick={props.onClick}
            style={Object.assign(
                buttonStyle,
                props.style
            )}
        >
            {props.icon}
            {props.children}
        </button>
    )
}
