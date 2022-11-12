import React from 'react'
import { styled } from '../../stitches.config'

const MockupCellStyled = styled('button',{
  userSelect: 'none',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  color: '$gray12',
  borderRadius:'$2',
  maxWidth:'250px',
  padding:'$1',
  minHeight: '85px',
  fontWeight: 'bold',
  transition: '$speed1',
  variants:{
    styleType:{
      button:{
        cursor: 'pointer',
        outlineColor:'$gray12',
        minWidth:'150px',
        '&:hover':{
          transform:'scale(1.02)',
          boxShadow:'$light'
        }
      },
      display:{
        outline:'none',
        minWidth:'230px',
      }
    }
  }
})

const MockupCellNameStyled = styled('h4',{
  textAlign: 'center',
  width:'130px',
  margin:'0',
})
const MockupCellDescriptionStyled = styled('p',{
  fontWeight: 'normal',
  fontSize: '0.8em',
  backgroundColor: '$gray1',
  color: '$gray12',
  borderRadius:'$1',
  padding: '5px 10px',
  width: 'fit-content',
  margin: '5px'
})

export interface MockupCellProps extends React.ComponentProps<typeof MockupCellStyled>{
  subjectName:string,
  subjectLink:string,
  subjectColor:string,
  subjectDescription:string,
}

export default function MockupCell(props:MockupCellProps) {

  return (
    <MockupCellStyled
      styleType={props.styleType}
      onClick={props.onClick}
      css={{
        backgroundColor: `${props.subjectColor ? props.subjectColor:'$gray3'}`,
        border:`1px solid ${props.subjectColor ? props.subjectColor:'$gray3'}`,
      }}
    >
      <MockupCellNameStyled
        onClick={() => {
          props.subjectLink && window.open(props.subjectLink, "_blank")
        }}
        css={{
          textDecoration: `${props.subjectLink && 'underline dotted'}`,
        }}
      >
        {props.subjectName ? props.subjectName : '科目名'}
      </MockupCellNameStyled>
      {/* <a style={{fontSize: '10px', fontWeight: 'normal', overflow: 'auto'}}>{props.subjectLink}</a> */}
      {props.subjectDescription &&
        <MockupCellDescriptionStyled>
          {props.subjectDescription}
        </MockupCellDescriptionStyled>
      }
    </MockupCellStyled>
  )
}
