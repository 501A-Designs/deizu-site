import React from 'react'

export default function BlockList(props) {
    let blockListStyle ={
        borderRadius: '7px',
        backgroundColor: 'rgb(238, 238, 238)',
        padding: '0.5em 1em',
        margin: '1em',
        fontSize: '1rem',
        width: 'fit-content'
    }
  return (
    <li style={blockListStyle}>{props.children}</li>
  )
}
