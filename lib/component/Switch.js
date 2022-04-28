import React from 'react'
import AlignItems from '../style/AlignItems'

export default function Switch(props) {
    let switchButtonContainerStyle ={
        border: '1px solid #f0f0f0',
        borderRadius:50,
        width:'fit-content',
        padding: '0.2em'
    }
    let switchButtonStyle ={
        width:'fit-content',
        border:'none',
        padding: '0.2em 1em',
        backgroundColor:'black',
        color:'white'
    }
  return (
    <div style={switchButtonContainerStyle}>
        <AlignItems style={{gap: '0.2em'}}>
            <button
                disabled={props.switchOffDisabled}
                style={Object.assign(switchButtonStyle,{borderRadius: '50px 0 0 50px'})}
                onClick={props.switchOff}
            >
                無効
            </button>
            <button
                disabled={props.switchOnDisabled}
                style={Object.assign(switchButtonStyle,{borderRadius: '0 50px 50px 0'})}
                onClick={props.switchOn}
            >
                有効
            </button>
        </AlignItems>
    </div>
  )
}
