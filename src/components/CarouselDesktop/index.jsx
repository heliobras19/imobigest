import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import Image from 'next/image';

export default function CarouselDesktop({ banners }) {
    return (
        <div className={`d-none d-md-block`}>
            <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    { banners && banners.length > 0 && banners.map((banner, index) => {
                        return (
                            <div className={`carousel-item ${index == 0 ? 'active' : ''}`} key={`banner-desktop-item-${banner.id}`}>
                                <Link href={banner.link}>
                                    <div className={styles.bannerDesktopItem}>
                                        { 
                                            banner.file.endsWith('.mp4') 
                                            ? <video  autoPlay loop style={{ width: '100%' }}>
                                                <source src={banner.file_url} type="video/mp4" />
                                                Seu navegador não suporta o elemento de vídeo.
                                              </video>
                                            : <Image
                                                src={banner.file_url}
                                                alt={banner.title ?? "banner principal"}
                                                className="d-block w-100"
                                                fill
                                            />
                                        }

                                        {banner.title != null ? 
                                            <div className={`carousel-caption d-none d-md-block ${styles.carouselCaption}`}>
                                                <h5 className={styles.carouselTitle}>{banner.title}</h5>
                                                <p className={styles.carouselSubtitle} >{banner.subtitle}</p>
                                            </div>
                                            : ''
                                        }
                                    </div>
                                </Link>
                            </div>
                        );
                    }) }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}