import React,{useState,useEffect} from 'react'
import BodyMargin from '../../lib/style/BodyMargin'
import { MdAddCircle,MdSettings } from "react-icons/md";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from "../../src/service/firebase"
import { collection, getDocs } from "firebase/firestore";
import Button from '../../lib/component/Button';
import LargeImageButton from '../../lib/component/LargeImageButton';
import Stack from '../../lib/style/Stack';
import AlignItems from '../../lib/style/AlignItems';
import { useRouter } from 'next/router'

export default function index() {
  const router = useRouter()

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
        <h1>データシート一覧</h1>
        <Button icon={<MdAddCircle/>} onClick={() => createDataSheet()}>
          データシートを作成
        </Button>
      </AlignItems>
      <br/>
      <Stack grid={'1fr 1fr'}>
        {allSheetData && 
          allSheetData.map((prop) =>{
            return (
              <LargeImageButton
                imageSource={`https://avatars.dicebear.com/api/jdenticon/${prop.dataSheetData.dataSheetName}.svg`}
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
