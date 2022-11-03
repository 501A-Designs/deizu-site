


export interface SheetDataTypes{
  title:string,
  date:any,
  sharing:boolean,
  location:string,
  bannerImageUrl?:string,
  backgroundImageUrl?:string,
}

export interface EditorProps {
  user?:any,
  viewOnly:boolean,
  sheetData:SheetDataTypes,
}