import React from 'react'
import { MdOutlineFlashOn,MdReportProblem } from 'react-icons/md';

export default function Banner(props) {
    let bannerStyle = {
        padding: '30px',
        borderRadius: 5,
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        margin: '0 0 1.5em 0'
    }
    let titleColor;
    let bannerType;
    if (props.type === 'announce') {        
        bannerType={
            border: '1px solid #bbc6f5',
            backgroundColor: '#d4e7ff',
            color: '#0066ff'
        }
        titleColor ={
            color: '#0066ff'
        }
    } if (props.type === 'caution') {
        bannerType={
            border: '1px solid #f5bbbb',
            backgroundColor: '#ffd4d4',
            color: 'red'
        }
        titleColor ={
            color: 'red'
        }
    } if (props.type === 'notice') {
        bannerType={
            border: '1px solid #7CC659',
            backgroundColor: '#C2FFA4',
            color: 'darkgreen'
        }
        titleColor ={
            color: 'darkgreen'
        }
    }
    let bannerIcon, bannerTitle;
    if (props.type === 'announce') {
        bannerIcon = <MdOutlineFlashOn/>;
        bannerTitle = '新着';
    }if (props.type === 'caution') {
        bannerIcon = <MdReportProblem/>;
        bannerTitle = '注意';
    }

    return (
        <div style={Object.assign(
            bannerStyle,
            bannerType,
            props.style
        )}>
            {bannerTitle && <p style={Object.assign({display:'flex',alignItems:'center',gap:'0.5em'},titleColor)}>
                {bannerIcon}
                {bannerTitle}
            </p>}
            {props.children}
        </div>
    )
}
