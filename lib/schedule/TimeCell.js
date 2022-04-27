import React from 'react'

export default function TimeCell(props) {
    let timeContainerStyle ={
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '85px',
        width: '60px',
        padding: '5px'
        // width:'fit-content'
    }
    let timeStyle ={
        border: '1px solid black',
        color: 'white',
        fontSize: '12px',
        float: 'right',
        borderRadius: 5,
        padding: '0.1em 0.5em',
        backgroundColor: 'black',
        textAlign: 'center',
        width: '100%',
        height: 'fit-content',
    }
    let timeStart,timeEnd;

    timeStart='12:00';
    timeEnd='14:00';

    return (
        <div style={timeContainerStyle}>
            {timeStart && <time style={timeStyle}>{timeStart}</time>}
            <h3 style={{textAlign:'center',fontWeight:'normal'}}>{props.displayPeriod}</h3>
            {timeEnd && <time style={timeStyle}>{timeEnd}</time>}
        </div>
    )
}
