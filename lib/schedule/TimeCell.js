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

    let timeContainerBorderRadius = 'var(--borderRadius0)';
    let timeBorderRadiusStart = 'var(--borderRadius0)';
    let timeBorderRadiusEnd = 'var(--borderRadius0)';

    if(displayPeriod === 1) {
        timeContainerBorderRadius = '15px var(--borderRadius0) var(--borderRadius0) var(--borderRadius0)';
        timeBorderRadiusStart = 'var(--borderRadius1) var(--borderRadius0) var(--borderRadius0) var(--borderRadius0)'
    }
    if(displayPeriod === 7) {
        timeContainerBorderRadius = 'var(--borderRadius0) var(--borderRadius0) var(--borderRadius0) 15px';
        timeBorderRadiusEnd = 'var(--borderRadius0) var(--borderRadius0) 15px var(--borderRadius1)'
    }

    let timeContainerStyle ={
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '5px',
        borderRadius: timeContainerBorderRadius,
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
        borderRadius: 'var(--borderRadius0)',
        backgroundColor: 'var(--system3)',
        padding: '0.1em 0.5em',
        textAlign: 'center',
        width: '100%',
        height: 'fit-content',
    }

    let timeStyleStart = {
        borderRadius: timeBorderRadiusStart
    }

    let timeStyleEnd = {
        borderRadius: timeBorderRadiusEnd
    }

    return (
        <div
            key={props.key}
            onClick={props.onClick}
            style={timeContainerStyle} 
            className={'scaleFont'}
        >   
            {timeStart ? 
                <time
                    style={{
                        ...timeStyle,
                        ...timeStyleStart
                    }}
                >
                    {timeStart}
                </time>:
                <time />
            }
            <h3 
                style={{
                    textAlign:'center',
                    fontWeight:'normal',
                    margin:0,
                    padding:0,
                    color:'var(--system3)'
                }}
            >
                {props.displayPeriod}
            </h3>
            {timeEnd ? 
                <time
                    style={{
                        ...timeStyle,
                        ...timeStyleEnd
                    }}
                >
                    {timeEnd}
                </time>:
                <time/>
            }
        </div>
    )
}
