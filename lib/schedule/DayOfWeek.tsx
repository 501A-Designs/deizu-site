import React from 'react'
import moment from 'moment';
import { styled } from '../../stitches.config';

const DayOfWeekStyle = styled('div',{
    userSelect: 'none',
    textAlign: 'center',
    padding: '0.5em',
    color: '$system4',

    variants:{
        today:{
            true:{
                border: '1px solid $system2',
                borderRadius: '$borderRadius2 $borderRadius2 $borderRadius1 $borderRadius1',
                backgroundColor: '$system2',
                fontWeight: 'bold',
                color: '$textColor1',
            },
            false:{
                border: '1px solid transparent',
            }
        }
    }
})

export default function DayOfWeek({day}:{day:number}) {
    const dayOfWeek = ['月','火','水','木','金','土']

    return (
        <DayOfWeekStyle
            today={`${moment().format('d') == day.toString()}`}
            className={'scaleFont'}
        >
            {dayOfWeek[day-1]}
        </DayOfWeekStyle>
    )
}
