import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import moment from 'moment';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react'
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { db } from '../../../src/service/firebase';
import { styled } from '../../../stitches.config';
import Button from '../../button/Button';
import ColorButton from '../../button/ColorButton';
import Dialog from '../../component/Dialog';
import Heading from '../../component/Heading';
import Input from '../../component/Input';
import MockupCell, { MockupCellProps } from '../../component/MockupCell';
import { buttonColor } from '../../data/buttonColor';
import AlignItems from '../../style/AlignItems';
import Stack from '../../style/Stack';

const SubjectCellStyled= styled('button', {
  userSelect: 'none',
  outlineColor:'$gray12',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontWeight: 'bold',
  minHeight: '85px',
  transition: '$speed1',
  cursor: 'pointer',
  border:'1px solid $gray3',
  '&:hover':{
    transform:'scale(0.95)',
    boxShadow:'$light',
    border:'1px solid $gray7',
  },
  justifyContent: 'space-between',
  '@bp1':{
    padding:'$1'
  },
  '@bp2_':{
    gap:'$1',
    padding:'$2'
  },
})
const SubjectCellNameContainerStyled = styled('div',{
  display:'flex',
  alignItems:'center',
  justifyContent: 'center',
  height:'100%'
})
const SubjectCellNameStyled = styled('h5', {
  color: '$gray12',
  textAlign: 'center',
  margin:'0',
  '@bp1':{
    fontSize:'$m',
  },
  '@bp2':{
    fontSize:'$xm',
  },
  '@bp3_':{
    fontSize:'$xl',
  },
})
const SubjectCellDescriptionStyled = styled('p', {
  fontWeight: 'normal',
  textAlign: 'center',
  width: 'fit-content',
  margin: '0',
  color: '$gray12',
  backgroundColor: '$gray1',
  borderRadius: '$1',
  '@bp1_2':{
    fontSize: '$s',
    padding:'2.5px $1'
  },
  '@bp3':{
    fontSize: '$m',
    padding:'3px $1'
  },
  '@bp4':{
    fontSize: '$xm',
    padding:'$1 $2'
  },
})

const ScrollX = styled('div',{
  display:'flex',
  gap:'$1',
  alignItems:'center',
  overflowX:'scroll',
  padding:'1em'
})


interface SubjectCellProps{
  viewOnly:boolean,
  cellData:any,
  cellId:any,
  dataSheetData:any,
  user?:any
}


export default function SubjectCell(props:SubjectCellProps) {
  const router = useRouter();
  const sheetId:string = `${router.query.id}`;
  let viewOnly = props.viewOnly
  let cellData = props.cellData;
  let cellId = props.cellId;
  let dataSheetData = props.dataSheetData;
  let user = props.user;

  const [subjectName, setSubjectName] = useState<string>(
    cellData && 
    cellData != undefined && 
    cellData[cellId] ?
    cellData[cellId]:''
  );
  const [subjectDescription, setSubjectDescription] = useState<string>(
    cellData &&
    cellData != undefined && 
    cellData[cellId+'Dscrp'] ?
    cellData[cellId+'Dscrp']:''
  );
  const [subjectColor, setSubjectColor] = useState<string>(
    cellData &&
    cellData != undefined && 
    cellData[cellId+'Color'] ?
    cellData[cellId+'Color']:''
  );
  const [subjectLink, setSubjectLink] = useState<string>(
    cellData &&
    cellData != undefined && 
    cellData[cellId+'Link'] ?
    cellData[cellId+'Link']:''
  )

  const dynamicBorderRadius = () =>{
    if (cellId == 'f1') {
      return '$1 $3 $1 $1';
    }if (cellId == 'f7') {
      return '$1 $1 $3 $1';
    }else{
      return '$1'
    }
  }
  
  const saveSubjectData = async (e:any) => {
    e.preventDefault();
    await setDoc(doc(db, `users/${user && user.uid}/scheduleGrid/${sheetId}`),
      {
        cells:{
          [cellId]: {
            [cellId]: subjectName,
            [cellId + 'Dscrp']: subjectDescription,
            [cellId + 'Link']: subjectLink,
            [cellId + 'Color']: subjectColor
          }
        },
        date: serverTimestamp(),
      }, { merge: true },
    );
  }

  function SubjectCellDisplay() {
    return (
      <SubjectCellStyled
        css={{
          borderRadius: `${dynamicBorderRadius()}`,
          backgroundColor: `${subjectColor ? subjectColor:'$gray3'}`,
          border: `1px solid ${subjectColor ? subjectColor:'$gray5'}`,
        }}
      >
        <SubjectCellNameContainerStyled>
          <SubjectCellNameStyled
            onClick={() => {
              subjectLink && window.open(subjectLink, "_blank")
            }}
          >
            {subjectName}
          </SubjectCellNameStyled>
        </SubjectCellNameContainerStyled>
        {subjectDescription && 
          <SubjectCellDescriptionStyled>
            {subjectDescription}
          </SubjectCellDescriptionStyled>
        }
      </SubjectCellStyled>
    )
  }
  

  return (
    <>
      {viewOnly ?
        <SubjectCellDisplay/>:
        <Dialog
          title={'編集中'}
          trigger={
            <SubjectCellStyled
            css={{
              borderRadius: `${dynamicBorderRadius()}`,
              backgroundColor: `${subjectColor ? subjectColor:'$gray3'}`,
              border: `1px solid ${subjectColor ? subjectColor:'$gray5'}`,
            }}
          >
            <SubjectCellNameContainerStyled>
              <SubjectCellNameStyled
                onClick={() => {
                  subjectLink && window.open(subjectLink, "_blank")
                }}
              >
                {subjectName}
              </SubjectCellNameStyled>
            </SubjectCellNameContainerStyled>
            {subjectDescription && 
              <SubjectCellDescriptionStyled>
                {subjectDescription}
              </SubjectCellDescriptionStyled>
            }
          </SubjectCellStyled>
          }
        >
          <Stack gap={'1em'}>
            <AlignItems justifyContent={'center'}>
              <MockupCell
                styleType={'display'}
                subjectName = {subjectName}
                subjectLink = {subjectLink}
                subjectColor = {subjectColor}
                subjectDescription = {subjectDescription}
              />
            </AlignItems>
              {!dataSheetData || dataSheetData !== '' &&
                <>
                  <Heading 
                    type={'h4'}
                    align={'center'}
                  >
                    「{dataSheetData?.dataSheetName}」データシートより
                  </Heading>
                  <ScrollX>
                    {dataSheetData?.dataSheet?.map((dataSheetCell:MockupCellProps) => {
                      return <MockupCell
                        styleType={'button'}
                        onClick={() => {
                          setSubjectName(dataSheetCell.subjectName);
                          setSubjectLink(dataSheetCell.subjectLink)
                          setSubjectColor(dataSheetCell.subjectColor);
                          setSubjectDescription(dataSheetCell.subjectDescription)
                        }}
                        key={dataSheetCell.subjectName}
                        subjectName = {dataSheetCell.subjectName}
                        subjectLink = {dataSheetCell.subjectLink}
                        subjectColor = {dataSheetCell.subjectColor}
                        subjectDescription = {dataSheetCell.subjectDescription}
                      />})
                    }
                  </ScrollX>
                </>
              }
            <AlignItems justifyContent={'center'}>
              <ColorButton
                color={'$gray3'}
                onClick={() => setSubjectColor('')}
              />
              {buttonColor.map((props)=>
                <ColorButton
                  key={props}
                  color={props}
                  selected={subjectColor == props}
                  onClick={() => setSubjectColor(props)}
                />
              )}
            </AlignItems>
            <Stack>
              <Input
                fullWidth
                value={subjectName}
                onChange={(e)=>setSubjectName(e.target.value)}
                placeholder={'科目名'}
              />
              <Input
                fullWidth
                value={subjectLink}
                onChange={(e)=>setSubjectLink(e.target.value)}
                placeholder={'URLリンク'}
              />
              <Input
                fullWidth
                value={subjectDescription}
                onChange={(e)=>setSubjectDescription(e.target.value)}
                placeholder={'概要・教室名等'}
              />
            </Stack>
            <Button
              icon={<FiSave/>}
              onClick={(e:any)=>{
                saveSubjectData(e);
                toast('保存完了！');
              }}
            >
              保存
            </Button>
          </Stack>
        </Dialog>
      }
    </>
  )
}