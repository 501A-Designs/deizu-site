import React from 'react'
import styles from '../styles/Home.module.css'

export default function Header() {
    return (
        <header>
            <a href="/">
                <img src="/deizuAppIconUpdated.png" />
            </a>
            <div className="alignItems">
                <button className={styles.blueBtn} onClick={() => { window.open('https://deizu-site.firebaseapp.com/', "_blank") }}>アプリを開く</button>
            </div>
        </header>
    )
}
