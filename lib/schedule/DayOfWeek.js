import React from 'react'
import moment from 'moment';

export default function DayOfWeek(props) {
    const dayOfWeek = ['月','火','水','木','金','土']
    let dayOfWeekStyle ={
        userSelect: 'none',
        textAlign: 'center',
        border: '1px solid transparent',
        padding: '0.5em',
        color: 'var(--system3)',
    }
    let todayStyle ={
        textAlign: 'center',
        border: '1px solid var(--system1)',
        padding: '0.5em',
        borderRadius: 'var(--borderRadius1) var(--borderRadius1) var(--borderRadius0) var(--borderRadius0)',
        backgroundColor: 'var(--system1)',
        fontWeight: 'bold',
        color: 'var(--txtColor0)',
    }

    return (
        <div
            style={moment().format('d') == props.day ? todayStyle:dayOfWeekStyle}
            className={'scaleFont'}
        >
            {dayOfWeek[props.day-1]}
        </div>
    )
}
