import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import Image from 'next/image';

export default function CarouselMobile({banners}) {
    const videoRef = useRef(null);
    useEffect(() => {
        if (videoRef.current) videoRef.current.play();
    }, []);
    
    return (
        <div className={`d-block d-md-none border-red`} style={{ height: '400px' }}>

            <div id="carouselExampleRideMobile" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    { banners && banners.length > 0 && banners.map((banner, index) => {
                        return (
                            <>
                                { banner.mobile_file != null && banner.mobile_file != '' && (
                                    <div 
                                        className={`carousel-item ${index == 0 ? 'active' : ''}`} 
                                        key={`banner-mobile-item-${banner.id}`}
                                    >
                                        <Link href={banner.link}>
                                            <div className={styles.bannerMobileItem}>
                                                {banner.file.endsWith('.mp4') && (
                                                    <video ref={videoRef} autoPlay muted playsInline loop style={{ width: '100%' }}>
                                                        <source src={banner.mobile_file_url} type="video/mp4" />
                                                        Seu navegador não suporta o elemento de vídeo.
                                                    </video>
                                                )}

                                                {banner.file.endsWith('.mp4') == false && (
                                                    <Image
                                                        src={banner.mobile_file_url}
                                                        alt={banner.title}
                                                        className="d-block w-100"
                                                        fill
                                                    />
                                                )}

                                                {banner.title != null && (
                                                    <div className={`carousel-caption d-none d-md-block ${styles.carouselCaption}`}>
                                                        <h5 className={styles.carouselTitle}>{banner.title}</h5>
                                                        <p className={styles.carouselSubtitle} >{banner.subtitle}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </>
                        );
                    }) } 
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRideMobile" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRideMobile" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    )
}