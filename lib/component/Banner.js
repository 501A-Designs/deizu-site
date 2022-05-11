import React from 'react'
import { MdOutlineFlashOn,MdReportProblem,MdLightbulb } from 'react-icons/md';

export default function Banner(props) {
    let bannerStyle = {
        padding: '20px 30px',
        borderRadius: 'var(--r5)',
        // boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        margin: '0 0 1.5em 0',
        border: '1px solid var(--system2)',
        backgroundColor: 'var(--system1)',
        color: 'var(--system3)'
    }
    let titleColor ={
        color: 'var(--system3)',
    }

    let bannerIcon, bannerTitle;
    if (props.type === 'announce') {
        bannerIcon = <MdOutlineFlashOn/>;
        bannerTitle = '新着';
    }if (props.type === 'caution') {
        bannerIcon = <MdReportProblem/>;
        bannerTitle = '注意';
    }if (props.type === 'tutorial') {
        bannerIcon = <MdLightbulb/>;
        bannerTitle = '使い方';
    }

    return (
        <div style={Object.assign(
            bannerStyle,
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
