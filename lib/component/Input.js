import React from 'react'
import { useState } from 'react'

export default function Input(props) {
    const [inputState, setInputState] = useState(false)
    let inputStyle ={
        backgroundColor: 'var(--system0)',
        border: '1px solid var(--system1)',
        padding: '10px',
        outline: 'none',
        borderRadius: 'var(--borderRadius1)',
        transition: '0.3s',
        width: `${props.width ? props.width :'100%'}`,
        boxShadow: `${inputState ? '0 8px 30px rgba(0, 0, 0, 0.12)':''}`,
        textAlign: `${props.type === 'time' ? 'left':'center'}`,
        color: 'var(--txtColor0)'
    }
  return (
    <input 
        onFocus={()=>setInputState(true)}
        onBlur={()=>setInputState(false)}
        onChange={props.onChange}
        value={props.value}
        style={inputStyle}
        type={props.type ? props.type : 'text'}
        placeholder={props.placeholder}
    />
  )
}
