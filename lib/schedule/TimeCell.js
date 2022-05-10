import React from 'react'

export default function TimeCell(props) {
    let sheetTimeData = props.sheetTimeData;
    let displayPeriod = props.displayPeriod;

    let timeStart,timeEnd;
    
    if (sheetTimeData === undefined || sheetTimeData[displayPeriod] === undefined){
        timeStart = '';
        timeEnd = '';
    }else{
        timeStart = sheetTimeData[displayPeriod].start;
        timeEnd = sheetTimeData[displayPeriod].end;
    }

    let timeContainerStyle ={
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '5px',
        borderRadius: 'var(--r5)',
        backgroundColor: 'var(--system1)',
        cursor: 'pointer',
        height: '85px',
        // width: '60px',
        width:'100%'
    }
    let timeStyle ={
        // border: '1px solid black',
        color: 'var(--txtColor1)',
        fontSize: '12px',
        float: 'right',
        borderRadius: 'var(--r5)',
        backgroundColor: 'var(--system3)',
        padding: '0.1em 0.5em',
        textAlign: 'center',
        width: '100%',
        height: 'fit-content',
    }

    return (
        <div
            key={props.key}
            onClick={props.onClick}
            style={timeContainerStyle} 
            className={'scaleFont'}
        >   
            {timeStart ? <time style={timeStyle}>{timeStart}</time>:<time />}
            <h3 
                style={{
                    textAlign:'center',
                    fontWeight:'normal',
                    margin:0,
                    padding:0
                }}
            >
                {props.displayPeriod}
            </h3>
            {timeEnd ? <time style={timeStyle}>{timeEnd}</time>:<time />}
        </div>
    )
}
