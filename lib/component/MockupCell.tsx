import React from 'react'
import { styled } from '../../stitches.config'

const MockupCellStyled = styled('div',{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    color: '$gray12',
    borderRadius:'$2',
    minWidth:'250px',
    padding:'$1',
    minHeight: '85px',
    fontWeight: 'bold',
    transition: '$speed1',
    cursor: 'pointer'
})

const MockupCellNameStyled = styled('h4',{
    textAlign: 'center',
    width:'150px',
    margin:'0',
})
const MockupCellDescriptionStyled = styled('p',{
    fontWeight: 'normal',
    fontSize: '0.8em',
    backgroundColor: '$gray12',
    color: '$gray1',
    borderRadius:'$1',
    padding: '5px 10px',
    width: 'fit-content',
    margin: '5px'
})

export default function MockupCell(props) {

    return (
        <MockupCellStyled
            css={{
                width: `${props.width ? props.width:'fit-content'}`,
                margin: `${props.margin ? props.margin :'auto'}`,
                backgroundColor: `${props.subjectCellColor ? props.subjectCellColor:'$gray3'}`,
                border:`1px solid ${props.subjectCellColor ? props.subjectCellColor:'$gray3'}`,
            }}
        >
            <MockupCellNameStyled
                onClick={() => {
                    props.subjectCellLink && window.open(props.subjectCellLink, "_blank")
                }}
                css={{
                    textDecoration: `${props.subjectCellLink && 'underline dotted'}`,
                }}
            >
                {props.subjectCellName ? props.subjectCellName : '科目名'}
            </MockupCellNameStyled>
            {/* <a style={{fontSize: '10px', fontWeight: 'normal', overflow: 'auto'}}>{props.subjectCellLink}</a> */}
            {props.subjectCellDescription && <MockupCellDescriptionStyled>
                {props.subjectCellDescription}
            </MockupCellDescriptionStyled>}
        </MockupCellStyled>
    )
}
