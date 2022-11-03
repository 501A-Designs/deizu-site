import { doc, setDoc } from 'firebase/firestore';
import moment from 'moment';
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
  '&:hover':{
    transform:'scale(0.95)',
    borderRadius: '$2',
  },

  // Media Query
  '@bp1':{
    justifyContent: 'space-between',
  },
  '@bp2_':{
    justifyContent: 'center',
  },
})

const SubjectCellNameStyled = styled('h4', {
  // textDecoration: `${subjectCellLink && 'underline dotted'}`,
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
  sheetCellsData:object[],
  cellId:string | object,
  user?:any
}

export default function SubjectCell(props:SubjectCellProps) {
  let viewOnly = props.viewOnly
  let sheetCellsData = props.sheetCellsData;
  let cellId = props.cellId;
  let user = props.user;

  const [subjectCellName, setSubjectCellName] = useState<string>(
    sheetCellsData && 
    sheetCellsData[cellId] != undefined && 
    sheetCellsData[cellId][cellId]
  );
  const [subjectCellDescription, setSubjectCellDescription] = useState<string>(
    sheetCellsData &&
    sheetCellsData[cellId] != undefined && 
    sheetCellsData[cellId][cellId+'Dscrp']
  );
  const [subjectCellColor, setSubjectCellColor] = useState<string>(
    sheetCellsData &&
    sheetCellsData[cellId] != undefined && 
    sheetCellsData[cellId][cellId+'Color']
  );
  const [subjectCellLink, setSubjectCellLink] = useState('')
  
  // const saveSubjectData = async (e:any) => {
  //   e.preventDefault();
  //   await setDoc(doc(db, "users", user.uid),
  //     {
  //       sheets:{
  //         [sheetName]: {
  //           date: serverTimestamp(),
  //           cells:{
  //             [modalCellId]: {
  //               [modalCellId]: subjectCellName,
  //               [modalCellId + 'Link']: subjectCellLink,
  //               [modalCellId + 'Dscrp']: subjectCellDescription,
  //               [modalCellId + 'Color']: subjectCellColor
  //             }
  //           }
  //         }
  //       },
  //     }, { merge: true }
  //   );
  // }

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
              value={subjectCellName}
              onChange={(e)=>setSubjectCellName(e.target.value)}
              placeholder={'科目名'}
            />
            <Input
              value={subjectCellLink}
              onChange={(e)=>setSubjectCellLink(e.target.value)}
              placeholder={'URLリンク'}
            />
            <Input
              value={subjectCellDescription}
              onChange={(e)=>setSubjectCellDescription(e.target.value)}
              placeholder={'概要・教室名等'}
            />
          </Stack>
          <Button
            icon={<FiSave/>}
            onClick={(e:any)=>{
              // saveSubjectData(e);
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