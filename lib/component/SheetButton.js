import React,{useState} from 'react'
import AlignItems from '../style/AlignItems'
import {MdPeople} from 'react-icons/md'

export default function ImageButton(props) {
    const [hovered, setHovered] = useState(false)
    let sheetButtonStyle ={
        borderRadius:'var(--r5)',
        backgroundColor:`${hovered ? 'var(--system1)':'var(--system0)'}`,
        padding: '0.8em',
        cursor: 'pointer',
        height: 'fit-content'
    }
    let sheetButtonImageStyle ={
        borderRadius:'var(--r5)',
        width:'2.5em',
        height:'2.5em',
        backgroundColor:'var(--system1)',
        objectFit: 'cover',
        border: `${hovered ? '1px solid var(--system0)':'1px solid var(--system0)'}`,
        boxShadow: `${hovered ? '0 8px 30px rgba(0, 0, 0, 0.12)':'none'}`,
    }
    let sheetSharingTagStyle ={
        color:'var(--txtColor0)',
        fontSize:'1em',
    }
    let sheetDateStyle ={
        color:'var(--system3)',
        fontSize:'0.8em',
    }
    return (
        <div
            key={props.key}
            style={sheetButtonStyle}
            onClick={props.onClick}
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
        >
            <AlignItems style={{justifyContent: 'space-between'}}>
                <AlignItems gap={'1em'}>
                    {props.imageSource ? 
                        <img
                            alt="no img found"
                            style={sheetButtonImageStyle}
                            src={props.imageSource}
                        />:
                        <img
                            style={sheetButtonImageStyle}
                            src={`https://avatars.dicebear.com/api/identicon/${props.children}.svg`}
                        />
                    }
                    <AlignItems>
                        <p 
                            style={{
                                padding: 0,
                                margin: 0,
                                height: 'fit-content'
                            }}
                        >
                            {props.children}
                        </p>
                        {props.sharing && <span style={sheetSharingTagStyle} title="リンク共有が有効されています"><MdPeople/></span>}
                    </AlignItems>
                </AlignItems>
                <AlignItems>
                    {props.date && <time style={sheetDateStyle} title="リンク共有が有効されています">{props.date}</time>}
                </AlignItems>
            </AlignItems>

        </div>
    )
}
