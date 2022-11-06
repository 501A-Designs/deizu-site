import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import moment from 'moment';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { db } from '../../../src/service/firebase';
import { styled } from '../../../stitches.config';
import Button from '../../button/Button';
import ColorButton from '../../button/ColorButton';
import Dialog from '../../component/Dialog';
import Input from '../../component/Input';
import MockupCell from '../../component/MockupCell';
import { buttonColor } from '../../data/buttonColor';
import AlignItems from '../../style/AlignItems';
import Stack from '../../style/Stack';


const SubjectCellStyled= styled('div', {
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontWeight: 'bold',
  height: '85px',
  transition: '$speed1',
  cursor: 'pointer',
  border:'1px solid $system1',
  '&:hover':{
    transform:'scale(0.95)',
    boxShadow:'$light',
    border:'1px solid $system3',
    // borderRadius: '$2',
  },
  '@bp1':{
    justifyContent: 'space-between',
  },
  '@bp2_':{
    justifyContent: 'center',
  },
})
const SubjectCellNameStyled = styled('h4', {
  color: '$textColor1',
  textAlign: 'center',
  '@bp1':{
    justifyContent: 'space-between',
  },
  '@bp2_':{
    justifyContent: 'center',
  },
})
const SubjectCellDescriptionStyled = styled('p', {
  fontWeight: 'normal',
  textAlign: 'center',
  // fontSize: `${!isMobile && '0.8em'}`,
  width: 'fit-content',
  margin: '5px',
  color: '$textColor2',
  backgroundColor: '$system4',
  borderRadius: '$1',
  '@bp1_2':{
    fontSize: '0.5em',
    padding:'2.5px $1'
  },
  '@bp3':{
    fontSize: '0.65em',
    padding:'3px $1'
  },
  '@bp4':{
    fontSize: '0.8em',
    padding:'$1 $2'
  },
})


interface SubjectCellProps{
  viewOnly:boolean,
  cellData:any,
  cellId:any,
  user?:any
}

export default function SubjectCell(props:SubjectCellProps) {
  const router = useRouter();
  const sheetId:string = `${router.query.id}`;
  let viewOnly = props.viewOnly
  let cellData = props.cellData;
  let cellId = props.cellId;
  let user = props.user;

  const [subjectCellName, setSubjectCellName] = useState<string>(
    cellData && 
    cellData != undefined && 
    cellData[cellId] ?
    cellData[cellId]:''
  );
  // console.log(cellData && 
  //   cellData != undefined && 
  //   cellData[cellId] ?
  //   cellData[cellId]:'NOTHING')
  const [subjectCellDescription, setSubjectCellDescription] = useState<string>(
    cellData &&
    cellData != undefined && 
    cellData[cellId+'Dscrp'] ?
    cellData[cellId+'Dscrp']:''
  );
  const [subjectCellColor, setSubjectCellColor] = useState<string>(
    cellData &&
    cellData != undefined && 
    cellData[cellId+'Color'] ?
    cellData[cellId+'Color']:''
  );
  const [subjectCellLink, setSubjectCellLink] = useState<string>(
    cellData &&
    cellData != undefined && 
    cellData[cellId+'Link'] ?
    cellData[cellId+'Link']:''
  )

  const dynamicBorderRadius = () =>{
    if (cellId == 'f1') {
      if (moment().format('d') == '6') {
        return '$1';
      }
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
            [cellId]: subjectCellName,
            [cellId + 'Dscrp']: subjectCellDescription,
            [cellId + 'Link']: subjectCellLink,
            [cellId + 'Color']: subjectCellColor
          }
        },
        date: serverTimestamp(),
      }, { merge: true },
    );
  }

  return (
    <Dialog
      title={viewOnly ? '編集不可能':'編集中'}
      openButton={
        <SubjectCellStyled
          css={{
            '@bp1':{
              borderRadius: '$1',
            },
            '@bp2_':{
              borderRadius: `${dynamicBorderRadius()}`,
            },
            border: `1px solid ${subjectCellColor ? subjectCellColor:'$system2'}`,
            backgroundColor: `${subjectCellColor ? subjectCellColor:'$system2'}`,
          }}
        >
          <SubjectCellNameStyled
            onClick={() => {
              subjectCellLink && window.open(subjectCellLink, "_blank")
            }}
          >
            {subjectCellName}
          </SubjectCellNameStyled>
          {subjectCellDescription && 
            <SubjectCellDescriptionStyled>
              {subjectCellDescription}
            </SubjectCellDescriptionStyled>
          }
        </SubjectCellStyled>
      }
    >
      {viewOnly ?
        <p>編集するにはオーナーにDeizuのユーザーIDを共有する必要があります。</p>:
        <Stack
          gap={'1em'}
          style={{paddingTop:'1em'}}
        >
          <MockupCell
            subjectCellName = {subjectCellName}
            subjectCellLink = {subjectCellLink}
            subjectCellColor = {subjectCellColor}
            subjectCellDescription = {subjectCellDescription}
          />
          {/* 
          {dataSheetName &&
            <>
              <h4 style={{textAlign: 'center', marginBottom:'0'}}>「{dataSheetName}」データシートより</h4>
              <AlignItems style={{overflowX:'scroll', padding:'1em'}}>
                {dataSheet.map(prop => {
                  return <MockupCell
                    onClick={() => {
                      setSubjectCellName(prop.subjectName);
                      setSubjectCellLink(prop.subjectLink)
                      setSubjectCellColor(prop.subjectColor);
                      setSubjectCellDescription(prop.subjectDescription)
                    }}
                    key={prop}
                    padding={'0 0.5em'}
                    subjectCellName = {prop.subjectName}
                    subjectCellLink = {prop.subjectLink}
                    subjectCellColor = {prop.subjectColor}
                    subjectCellDescription = {prop.subjectDescription}
                  />})
                }
              </AlignItems>
            </>
          } */}
          <AlignItems justifyContent={'center'}>
            <ColorButton
              color={'var(--system1)'}
              onClick={() => setSubjectCellColor('')}
            />
            {buttonColor.map((props)=>
              <ColorButton
                key={props}
                color={props}
                selected={subjectCellColor == props}
                onClick={() => setSubjectCellColor(props)}
              />
            )}
          </AlignItems>
          <Stack>
            <Input
              fullWidth
              value={subjectCellName}
              onChange={(e)=>setSubjectCellName(e.target.value)}
              placeholder={'科目名'}
            />
            <Input
              fullWidth
              value={subjectCellLink}
              onChange={(e)=>setSubjectCellLink(e.target.value)}
              placeholder={'URLリンク'}
            />
            <Input
              fullWidth
              value={subjectCellDescription}
              onChange={(e)=>setSubjectCellDescription(e.target.value)}
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
      }
    </Dialog>
  )
}