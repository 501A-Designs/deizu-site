import React,{useState} from 'react'
import Dialog from '../../component/Dialog';
import Stack from '../../style/Stack';
import AlignItems from '../../style/AlignItems';
import MockupCell from '../../component/MockupCell';
import { styled } from '../../../stitches.config';
import { buttonColor } from '../../data/buttonColor';
import ColorButton from '../../button/ColorButton';
import { FiSave } from 'react-icons/fi';
import Button from '../../button/Button';
import Input from '../../component/Input';
import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../src/service/firebase';
import { useRouter } from 'next/router';


const DataSheetSubjectCellStyled = styled('section',{
  cursor:'pointer',
  width:'100%',
  borderRadius:'$3',
  border:'3px dotted transparent',
  padding:'$2',
  transition:'$speed1',
  '&:hover':{
    transform:'scale(0.95)',
    borderColor:'$gray10',
    backgroundColor:'$gray3',
    padding:'$2',
  }
})

export default function DataSheetSubjectCell(props:any) {
  const router = useRouter();
  const dataSheetId:string = `${router.query.id}`;

  const [subjectNameInput, setSubjectNameInput] = useState(props.subjectName ? props.subjectName:'');
  const [subjectLinkInput, setSubjectLinkInput] = useState(props.subjectLink ? props.subjectLink:'');
  const [subjectColorInput, setSubjectColorInput] = useState(props.subjectColor ? props.subjectColor:'');
  const [subjectDescriptionInput, setSubjectDescriptionInput] = useState(props.subjectDescription ? props.subjectDescription:'');

  const overrideSubjectData = async () => {
    const docRef = doc(db, `sheets/${dataSheetId}`);
    await updateDoc(docRef,{
      dataSheet: arrayRemove(props.data)
    });
    setDoc(docRef,
      {
        dataSheet:
          arrayUnion({
            subjectName: subjectNameInput,
            subjectDescription: subjectDescriptionInput,
            subjectLink: subjectLinkInput,
            subjectColor: subjectColorInput,
          })
      }, { merge: true }
    );
  }

  const deleteSubjectData = async () =>{
    let deleteConfirm = confirm('本当に削除しますか？');
    if (deleteConfirm) {
      const docRef = doc(db, `sheets/${dataSheetId}`);
      await updateDoc(docRef,{
        dataSheet: arrayRemove(props.data)
      })
    }
  }

  return (
    <>
      {props.enableDeleteMode ?
        <DataSheetSubjectCellStyled
          onClick={() => deleteSubjectData()}
        >
          <MockupCell
            key={props.key}
            subjectName = {subjectNameInput}
            subjectLink = {subjectLinkInput}
            subjectColor = {subjectColorInput}
            subjectDescription = {subjectDescriptionInput}
          />
        </DataSheetSubjectCellStyled>:
        <Dialog
          title={'科目を編集'}
          trigger={
            <MockupCell
              styleType={'button'}
              key={props.key}
              subjectName = {subjectNameInput}
              subjectLink = {subjectLinkInput}
              subjectColor = {subjectColorInput}
              subjectDescription = {subjectDescriptionInput}
            />
          }
        >
          <Stack>
            <AlignItems justifyContent={'center'}>
              <MockupCell
                // key={props}
                subjectName = {subjectNameInput}
                subjectLink = {subjectLinkInput}
                subjectColor = {subjectColorInput}
                subjectDescription = {subjectDescriptionInput}
              />
            </AlignItems>

            <AlignItems
              marginTop={'medium'}
              marginBottom={'medium'}
              justifyContent={'center'}
            >
              {buttonColor.map((colorProps)=>
                <ColorButton
                  key={colorProps}
                  color={colorProps}
                  onClick={() => {
                    setSubjectColorInput(colorProps);
                  }}
                />
              )}
            </AlignItems>
            <Input
              fullWidth
              value={subjectNameInput}
              onChange={(e)=>setSubjectNameInput(e.target.value)}
              placeholder={'科目名'}
            />
            <Input
              fullWidth
              value={subjectDescriptionInput}
              onChange={(e)=>setSubjectDescriptionInput(e.target.value)}
              placeholder={'科目の概要'}
            />
            <Input
              fullWidth
              value={subjectLinkInput}
              onChange={(e)=>setSubjectLinkInput(e.target.value)}
              placeholder={'URLリンク'}
            />
            <Button
              disabled={subjectNameInput ? false:true}
              onClick={() => overrideSubjectData()}
              icon={<FiSave/>}
            >
              上書き保存
            </Button>
          </Stack>
        </Dialog>
      }
    </>
  )
}
