import React,{useState,useEffect} from 'react'
import BodyMargin from '../../lib/style/BodyMargin'
import { MdAddCircle,MdArrowBack } from "react-icons/md";

import { collection, getDocs } from "firebase/firestore";
import Button from '../../lib/component/Button';
import IconButton from '../../lib/component/IconButton';

import LargeImageButton from '../../lib/component/LargeImageButton';
import Stack from '../../lib/style/Stack';
import AlignItems from '../../lib/style/AlignItems';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from "../../src/service/firebase"

export default function index() {
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth);

  const [allSheetData, setAllSheetData] = useState()

  const fetchData = async () => {
    const collectionRef = collection(db, "sheets");
    const querySnapshot = await getDocs(collectionRef);
    let sheetDataArray = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id)
      sheetDataArray.push(
        {
          dataSheetId: doc.id,
          dataSheetData: doc.data(),
        }
        );
      })
    setAllSheetData(sheetDataArray);
  }
  // fetchData()
  useEffect(() => {
    fetchData()
    console.log('test')
  }, []);

  if (allSheetData) {
    console.log(allSheetData)
  }

  const createDataSheet = (e) => {

  }

  return (
    <BodyMargin>
      <AlignItems style={{justifyContent: 'space-between'}}>
        <AlignItems gap={'1em'}>
          <IconButton icon={<MdArrowBack/>} onClick={() =>router.push(`/user/${user.uid}`)}>戻る</IconButton>
          <h1 style={{margin: 0,padding:0}}>データシート一覧</h1>
        </AlignItems>
        <Button icon={<MdAddCircle/>} onClick={() => router.push('/datasheet/create')}>
          データシートを作成
        </Button>
      </AlignItems>
      <br/>
      <Stack grid={'1fr 1fr'}>
        {allSheetData && 
          allSheetData.map((prop) =>{
            return (
              <LargeImageButton
                dataSheetId={prop.dataSheetId}
                dataSheetName={prop.dataSheetData.dataSheetName}
                imageSource={prop.dataSheetData.dataSheetImageUrl}
                subtitle={prop.dataSheetData.dataSheetDescription}
                onClick={() => router.push(`/datasheet/${prop.dataSheetId}`)}
              >
                {prop.dataSheetData.dataSheetName}
              </LargeImageButton>
            )
          })
        }
      </Stack>
    </BodyMargin>
  )
}
