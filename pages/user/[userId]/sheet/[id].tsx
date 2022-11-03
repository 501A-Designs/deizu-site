import React, {useEffect, useState} from 'react'

import { NextSeo } from 'next-seo';
import StaticScene from '../../../../lib/style/StaticScene';

import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocument, useDocumentData } from 'react-firebase-hooks/firestore';

import { auth,db } from "../../../../src/service/firebase"
import { collection, doc, getDoc} from "firebase/firestore";

import Editor from '../../../../lib/pages/sheet/Editor';
import { styled } from '../../../../stitches.config';
import { SheetDataTypes } from '../../../../lib/data/types/types';


function IndivisualSheet() {
  const router = useRouter();
  const sheetOwnerId:string = `${router.query.userId}`;
  const sheetId:string = `${router.query.id}`;

  const [sheetBackgroundImageUrl, setSheetBackgroundImageUrl] = useState<string>();
  
  const [user] = useAuthState(auth);  
  const [userDataRaw] = useDocument<any>(doc(db, `users/${sheetOwnerId && sheetOwnerId}`));
  const [sheetDataRaw] = useDocument<any>(doc(db,`users/${sheetOwnerId && sheetOwnerId}/scheduleGrid/${sheetId && sheetId}`));

  const userData = userDataRaw && userDataRaw.data();
  const sheetData:SheetDataTypes = sheetDataRaw && sheetDataRaw.data();

  useEffect(() => {
    setSheetBackgroundImageUrl(sheetData && sheetData.backgroundImageUrl);
  },[sheetData])
  

  // Legacy
  // const fetchDataSheet = (prop) =>{
  //   if (prop) {
  //     getDoc(doc(db, "sheets", prop)).then((doc) => {
  //       if(doc.data()){
  //         setDataSheet(doc.data().dataSheet);
  //         setDataSheetName(doc.data().dataSheetName);
  //       }else{
  //         alert("データシートが見つかりません")
  //       }
  //     })
  //   }else{
  //     console.log("removed");
  //   }
  // }

  const WallpaperStyled = styled('div',{
    margin:0,
    padding:0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  })

  return (
    <WallpaperStyled
      css={{backgroundImage:`url(${sheetBackgroundImageUrl})`}}
    >
      <NextSeo
        title={sheetData ? sheetData.title:'更新中・・・'}
        description={"Deizuで作成した時間割表"}
      />
      {!sheetData ? <StaticScene type="loading"/>:
        <>
          {user ? 
            <>
              {sheetOwnerId === user.uid ? 
                <Editor
                  user={user}
                  viewOnly={false}
                  sheetData={sheetData}
                />:
                <>
                  {sheetData.sharing ?
                    <Editor
                      user={user}
                      viewOnly={true}
                      sheetData={sheetData}
                    />:
                    <StaticScene type="accessDenied"/>
                  }
                </>
              }
            </>:
            <>
              {sheetData.sharing ? 
                <Editor
                  viewOnly={true}
                  sheetData={sheetData}
                />:
                <StaticScene type="accessDenied"/>
              }
            </>
          }
        </>
      }
    </WallpaperStyled>
  )
}

export default IndivisualSheet