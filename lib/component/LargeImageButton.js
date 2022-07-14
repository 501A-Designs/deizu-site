import React,{useState} from 'react'
import AlignItems from '../style/AlignItems'
import Stack from '../style/Stack'
import IconButton from '../../lib/component/IconButton'
import { MdAdd } from "react-icons/md";
import { toast } from 'react-toastify';

export default function LargeImageButton(props) {
    const [hovered, setHovered] = useState(false)
    let largeImageButtonStyle ={
        minWidth: '200px',
        backgroundColor: `${hovered ? 'var(--system0)':'var(--system1)'}`,
        boxShadow: `${hovered ? '0 8px 30px rgba(0, 0, 0, 0.12)':''}`,
        border:'1px solid var(--system1)',
        borderRadius:'var(--r5)',
        padding: '1em',
        transition:'0.2s',
        cursor: 'pointer'
    }
    let largeImageButtonImageStyle ={
        borderRadius:'var(--r5)',
        width:'3.5em',
        height:'3.5em',
        backgroundColor:'var(--system0)',
        border: '1px solid var(--system1)',
        objectFit: 'cover',
    }

    return (
        <div
            key={props.key}
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            style={largeImageButtonStyle}
        >
            <AlignItems style={{justifyContent: 'space-between'}}>
                <AlignItems>
                    {props.imageSource && <img alt="no img found" style={largeImageButtonImageStyle} src={props.imageSource} onClick={props.onClick}/>}
                    <h3 style={{padding: 0,margin: 0, height: 'fit-content', textDecoration: 'underline'}} onClick={props.onClick}>{props.children}</h3>
                </AlignItems>
                {/* toast(`「${props.dataSheetName}」が追加されました。「データシートを繋げる」ボタンを押すことでご利用できます。`); */}
                {props.displayAddButton && 
                    <>                
                        <IconButton
                            onClick={props.addDataSheetOnClick}
                            icon={<MdAdd/>}
                        >
                            IDをコピー
                        </IconButton>
                    </>
                }
            </AlignItems>
            {/* <p style={{padding: 0,margin: 0, height: 'fit-content'}}>{props.subtitle}</p> */}
        </div>
    )
}
