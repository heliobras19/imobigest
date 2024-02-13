import React, { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import Image from 'next/image';

export default function Header(user) {

    return (
        <div className={`${styles.root} p-2 m-3 mb-md-5 col-lg-5 col-md-12`}>
            <div className={`row`}>
                <div className={`col-10 d-flex flex-column justify-content-center`}>
                    <div className={`row`}>
                        <h5>{user.user.name}</h5>
                    </div>
                    <div className={`row`}>
                        <span>{user.user.job}</span>
                    </div>
                </div>
                <div className={`col-2 d-flex justify-content-center`}>
                    <Image height="60" width="60" src={user.user.image_url} className={styles.image} alt="Foto do vendedor" />
                </div>
            </div>
            <hr />
            <div className={`row d-flex align-items-center mb-2`}>
                <div className={`col-2  d-flex justify-content-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                </div>
                <div className={`col-10 ${styles.containerText}`}>
                    {user.user.name}
                </div>
            </div>
            <div className={`row d-flex align-items-center mb-2`}>
                <div className={`col-2  d-flex justify-content-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                </div>
                <div className={`${styles.containerEmail} col-10`}>
                    <Link href={`mailto:${user.user.email}`} className={`text-decoration-none text-dark`}>
                        {user.user.email}
                    </Link>
                </div>
            </div>
            <div className={`row d-flex align-items-center mb-2`}>
                <div className={`col-2  d-flex justify-content-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                </div>
                <div className={`col-10 ${styles.containerText}`}>
                    <Link href={`tel:${user.user.phone}`} className={`text-decoration-none text-dark pe-1`}>
                        {user.user.phone} {user.user.phone_extension ? ` - Ramal ${user.user.phone_extension}` : ''}
                    </Link>
                </div>
            </div>
            <div className={`row d-flex align-items-center mb-2`}>
                <div className={`col-2 d-flex justify-content-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                </div>
                <div className={`col-10 ${styles.containerText}`}>
                    <Link href={`https://wa.me/55${user.user.whatsapp.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')}`} className={`text-decoration-none text-dark pe-1`}>
                        {user.user.whatsapp}
                    </Link>
                </div>
            </div>
        </div>
    )
}