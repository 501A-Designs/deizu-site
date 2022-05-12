import React from 'react'
import moment from 'moment';

export default function DayOfWeek(props) {
    const dayOfWeek = ['月','火','水','木','金','土']

    let dayOfWeekStyle ={
        textAlign: 'center',
        border: '1px solid transparent',
        padding: '0.5em',
        color: 'var(--system3)',
        // fontSize: '0.8em',
    }
    let todayStyle ={
        textAlign: 'center',
        border: '1px solid var(--system1)',
        padding: '0.5em',
        borderRadius: 'var(--r5)',
        backgroundColor: 'var(--system1)',
        fontWeight: 'bold',
        color: 'var(--txtColor0)',
    }

    return (
        <div
            style={moment().format('d') == props.day ? todayStyle:dayOfWeekStyle}
            className={'scaleFont'}
        >
            {/* {`${moment().format('d') == props.day ? '今日：':''}
            ${dayOfWeek[props.day-1]}`} */}
            {dayOfWeek[props.day-1]}
        </div>
    )
}
