import React from 'react'
import { useState } from 'react'

export default function Input(props) {
    const [inputState, setInputState] = useState(false)
    let inputStyle ={
        backgroundColor: 'white',
        border: '1px solid #f0f0f0',
        padding: '10px',
        outline: 'none',
        borderRadius: 5,
        transition: '0.3s',
        width: `${props.width ? props.width :'100%'}`,
        boxShadow: `${inputState ? '0 8px 30px rgba(0, 0, 0, 0.12)':''}`,
    }
  return (
    <input 
        onFocus={()=>setInputState(true)}
        onBlur={()=>setInputState(false)}
        style={inputStyle}
        type="text"
        placeholder={props.placeholder}
    />
  )
}
