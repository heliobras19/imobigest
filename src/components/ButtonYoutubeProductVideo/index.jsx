import React, { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';


export default function ButtonYoutubeProductVideo({slug}) {

    return (
        <Link href={`/imovel/${slug}`} className={`text-decoration-none text-light`}>
            <button className={`${styles.root} btn d-flex justify-content-center align-items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="currentColor" className="bi bi-bag-fill me-2" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                </svg>
                Solicitar Orçamento   
            </button>
        </Link>
    )
}