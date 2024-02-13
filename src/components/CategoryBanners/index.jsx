import React, { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import Image from 'next/image';

export default function CategoryBanners({ banners }) {    
    return (
        <>
            <div className={`container-fluid`}>
                <div className={`row d-flex justify-content-center`}>
                    {banners && banners.length > 0 && banners.map((banner, key) => {
                        return (
                            <div className={`col-sm-4 col-xxl-3 p-0`} key={`banner-secundario-item-${key}`}>
                                <Link href={banner.link}>
                                    <span className={styles.imageContainer}>
                                        <div className={styles.imageWrapper}>
                                            <Image 
                                                src={banner.file_url}
                                                alt={banner.title ?? "banner secundario"}
                                                fill
                                            />
                                        </div>
                                    </span>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}