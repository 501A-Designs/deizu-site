import React, {useEffect, useState} from 'react'

import { NextSeo } from 'next-seo';
import StaticScene from '../../../../lib/style/StaticScene';

import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocument, useDocumentData } from 'react-firebase-hooks/firestore';

import { auth,db } from "../../../../src/service/firebase"
import { doc, DocumentData } from "firebase/firestore";

import Editor from '../../../../lib/pages/sheet/Editor';
import { styled } from '../../../../stitches.config';
import StatusBar from '../../../../lib/component/StatusBar';
import { FiArchive, FiUsers } from 'react-icons/fi';

function IndivisualSheet() {
  const router = useRouter();
  const sheetOwnerId:string = `${router.query.userId}`;
  const sheetId:string = `${router.query.id}`;

  const [sheetBackgroundImageUrl, setSheetBackgroundImageUrl] = useState<string>();
  
  const [user] = useAuthState(auth);  
  const [userData, userDataLoading] = useDocument<DocumentData>(doc(db, `users/${sheetOwnerId && sheetOwnerId}`));
  const [sheetData, sheetDataLoading, error] = useDocument<DocumentData>(doc(db,`users/${sheetOwnerId && sheetOwnerId}/scheduleGrid/${sheetId && sheetId}`));
  console.log(sheetData)

  useEffect(() => {
    setSheetBackgroundImageUrl(sheetData?.data()?.backgroundImageUrl);
  },[sheetData])

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
        title={
          sheetDataLoading ? '更新中・・・':
          sheetData?.data() ? sheetData?.data()?.title:':P'
        }
        description={"Deizuで作成した時間割表"}
      />
      {sheetDataLoading && <StaticScene type="loading"/>}
      {sheetData?.data() ?
        <>
          {user ? 
            <>
              {sheetOwnerId === user.uid ? 
                <Editor
                  user={user}
                  viewOnly={false}
                  sheetData={sheetData?.data()}
                />:
                <>
                  {sheetData?.data()?.sharing ?
                    <Editor
                      user={user}
                      viewOnly={true}
                      sheetData={sheetData?.data()}
                    />:
                    <StaticScene type="accessDenied"/>
                  }
                </>
              }
            </>:
            <>
              {sheetData?.data()?.sharing ? 
                <Editor
                  viewOnly={true}
                  sheetData={sheetData?.data()}
                />:
                <StaticScene type="accessDenied"/>
              }
            </>
          }
        </>:
        <StaticScene type="accessDenied"/>
      }
    </WallpaperStyled>
  )
}

export default IndivisualSheet