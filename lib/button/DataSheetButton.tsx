import React from 'react'
import AlignItems from '../style/AlignItems'

import { FiPlus, FiCheck } from "react-icons/fi";
import gradient from 'random-gradient'
import Button from './Button';
import { styled } from '../../stitches.config';
import { useRouter } from 'next/router';
import Heading from '../component/Heading';

const DataSheetButtonStyled = styled('div',{
  minWidth: '200px',
  color:'$system4',

  borderBottom: '1px solid transparent',
  borderImage: 'linear-gradient(90deg, $gray1 0%, $gray4 50%, $gray1 100%)',
  borderImageSlice: 1,

  borderRadius:'$2',
  padding: '$1',
  transition:'$speed1',
  cursor: 'pointer',
  backgroundColor:'$system1',
})
// Nested Image
const DataSheetButtonImageStyled = styled('div', {
  borderRadius:'$2',
  width:'3.5em',
  height:'3.5em',
  background:'$system1',
  border: '1px solid $system2',
  variants:{
    imageSource:{
      true:{
        objectFit: 'cover',
      },
    }
  }
})

interface DataSheetButtonProps extends React.ComponentProps<typeof DataSheetButtonStyled>{
  imageSource?:string,
  dataSheetId:string,
  displayAddButton:boolean,
  currentDataSheetId:string,
  subtitle?:string
}


export default function DataSheetButton(props:DataSheetButtonProps) {
  let router = useRouter();
  return (
    <DataSheetButtonStyled>
      <AlignItems justifyContent={'spaceBetween'}>
        <AlignItems
          gap={'medium'}
          onClick={()=>router.push(`/datasheet/${props.dataSheetId}/`)}
        >
          <DataSheetButtonImageStyled
            imageSource={props.imageSource ? true:false}
            css={{
              background:gradient(props.dataSheetId),
              backgroundImage:props.imageSource,
            }}
          />
          <Heading type={'h3'}>
            {props.children}
          </Heading>
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
    </DataSheetButtonStyled>
  )
}
