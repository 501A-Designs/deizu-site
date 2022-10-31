import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { FiCalendar, FiPlus } from 'react-icons/fi';
import { styled } from '../../../stitches.config';
import Button from '../../button/Button';
import SheetButton from '../../button/SheetButton';
import Container from '../../component/Container';
import AlignItems from '../../style/AlignItems';
import Stack from '../../style/Stack';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../src/service/firebase';

const SheetContainerStyled = styled(Container,{
  'p':{
    textAlign:'center',
    color:'$textColor1'
  }
})

export default function SheetContainer({user}:{user:any}) {
  const router = useRouter();

  const [sheetTitle, setSheetTitle] = useState([]);
  const [sheetMetaData, setSheetMetaData] = useState([]);
  
  // const [dashboardData] = useDocument(doc(db, `users/${user && user.uid}/`));
  const fetchData = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      let doc = docSnapshot;
      // setUserImageUrl(doc.data().url ? doc.data().url:'');
      // setThemeColor(doc.data().themeColor ? doc.data().themeColor:themeColorData[0].value);
      setSheetTitle(Object.keys(doc.data().sheets));

      let sheetMetaDataArray:object[] = [];
      const sheetObject = doc.data().sheets;

      if (Object.keys(doc.data().sheets).length > 0) {
        Object.keys(sheetObject).map(sheetName => {
          sheetMetaDataArray.push({
            sheetName: sheetName,
            bannerImageUrl:doc.data().sheets[sheetName].bannerImageUrl,
            sharing:doc.data().sheets[sheetName].sharing,
            date:doc.data().sheets[sheetName].date,
          })
        })
        setSheetMetaData(sheetMetaDataArray)
      }
    }
  }
  
  useEffect(() => {user && fetchData()},[user]);

  return (
    <SheetContainerStyled>
      {sheetTitle && 
        <>
          {
            sheetTitle.length > 0 ? 
            <>
              <AlignItems
                justifyContent={'spaceBetween'}
                marginBottom={'medium'}
              >
                <h1>Dashboard</h1>
                <Button
                  onClick={() => router.push(`/user/${user.uid}/sheet`)}
                  icon={<FiPlus/>}
                >
                  新規作成
                </Button>
              </AlignItems>
              <Stack>
                {sheetMetaData.map((prop:any) =>
                  <SheetButton
                    key={prop.sheetName}
                    imageSource={prop.bannerImageUrl}
                    onClick={() =>{
                      // setLoadSheet(true);
                      router.push(`/user/${user.uid}/sheet/${prop.sheetName}`);
                    }}
                    sharing={prop.sharing}
                    date={prop.date.toDate().toDateString()}
                  >
                    {prop.sheetName}
                  </SheetButton>
                )}
              </Stack>
              <p>
                時間表合計：{sheetTitle.length}枚
              </p>
            </>:
            <>
              <Container
                index={'inner'}
                styleType={"filled"}
              >
                <ol>
                  <li>時間割表を作成</li>
                  <li>科目や時間を入力する</li>
                  <li>友達や家族と共有！</li>
                </ol>
              </Container>
              <Container styleType="transparent">
                <AlignItems justifyContent={'center'}>
                  <AlignItems
                    justifyContent={'center'}
                    flexDirection={'column'}
                  >
                    <span
                      style={{
                        fontSize: '2em',
                        color: 'var(--system3)'
                      }}
                    >
                      <FiCalendar/>
                    </span>
                    <h3 style={{color: 'var(--system3)'}}>
                      時間割表が作成されていません
                    </h3>
                    <AlignItems>
                      <Button
                        onClick={() => router.push(`/user/${user.uid}/sheet`)}
                        icon={<FiPlus/>}
                      >
                        新規作成
                      </Button>
                    </AlignItems>
                  </AlignItems>
                </AlignItems>
              </Container>
            </>
          }
        </>
      }
    </SheetContainerStyled>
  )
}
