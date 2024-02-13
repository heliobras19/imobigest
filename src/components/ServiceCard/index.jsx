import React, { useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

export default function ServiceCard({ service }) {
    
    return (
        <div className={`${styles.container} container p-4 mb-4 mb-md-0`}>
            <div className={`row mb-3 d-flex justify-content-center`}>
                <div className={styles.serviceImage}>
                    <Image
                        src={service.image}
                        alt={service.title}
                        className='img-fluid p-0'
                        fill
                    />
                </div>
            </div>
            <div className={` ${styles.title} row mb-3`}>
                <span className={`text-center spectral`}>{service.title}</span>
            </div>
            <div className={`row text-center text-secondary`}>
                {service.description}
            </div>
        </div>
    )
}