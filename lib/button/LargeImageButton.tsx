import React from 'react'
import AlignItems from '../style/AlignItems'

import { FiPlus, FiCheck } from "react-icons/fi";
import gradient from 'random-gradient'
import Button from './Button';
import { styled } from '../../stitches.config';
import { Router, useRouter } from 'next/router';

const LargeImageButtonStyled = styled('div',{
  minWidth: '200px',
  border:'1px solid var(--system1)',
  borderRadius:'var(--borderRadius1)',
  padding: '1em',
  transition:'0.2s',
  cursor: 'pointer',
  backgroundColor:'$system2',
  '&:hover':{
    backgroundColor: '$system1',
  }
})
// Nested Image
const LargeImageButtonImageStyled = styled('div', {
  borderRadius:'$borderRadius1',
  width:'3.5em',
  height:'3.5em',
  background:'$system1',
  border: '1px solid $system2',
  variants:{
    imageSource:{
      true:{
        objectFit: 'cover',
      },
      // false:{
      //   background:gradient(props.dataSheetId),
      // }
    }
  }
})

interface LargeImageButtonProps extends React.ComponentProps<typeof LargeImageButtonStyled>{
  imageSource?:string,
  dataSheetId:string,
  displayAddButton:boolean,
  currentDataSheetId:string,
  subtitle?:string
}


export default function LargeImageButton(props:LargeImageButtonProps) {
  let router = useRouter();

  return (
    <LargeImageButtonStyled>
      <AlignItems justifyContent={'spaceBetween'}>
        <AlignItems
          gap={'medium'}
          onClick={()=>router.push(`/datasheet/${props.dataSheetId}/`)}
        >
          <LargeImageButtonImageStyled
            imageSource={props.imageSource ? true:false}
            css={{
              background:gradient(props.dataSheetId),
              backgroundImage:props.imageSource,
            }}
          />
          <h3
            style={{
              padding: 0,
              margin: 0,
            }}
          >
            {props.children}
          </h3>
        </AlignItems>
        {props.displayAddButton && 
          <>
          {props.dataSheetId === props.currentDataSheetId ?
            <Button
              size={'small'}
              icon={<FiCheck/>}
            >
              選択済み
            </Button>:
            <Button
              size={'small'}
              icon={<FiPlus/>}
              onClick={()=>props.onClick}
            >
              IDをコピー
            </Button>
          }
          </>
        }
      </AlignItems>
    </LargeImageButtonStyled>
  )
}
