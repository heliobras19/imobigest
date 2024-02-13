import React, { useState } from 'react';
import styles from './styles.module.css';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Image from 'next/image';

export default function CustomerTestimonial({items}) {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
            { items && items.map((item, key) => {
                return (
                    <div key={`testimonial-item-${key}`} className={` d-md-flex justify-content-center container pb-5`}>
                        <div className={`col-md-6`}>
                            <div className={`row mb-5`}>
                                <div className={`d-flex justify-content-center mt-5 mt-md-0`}>
                                    <Image alt="Logo" src={item.logo_url} className={styles.imageCard} width="100" height="100" />
                                </div>
                            </div>
                            <div className={`row mb-5`}>
                                <span className={`${styles.testimonial} text-center spectral`}>{item.content}</span>
                            </div>
                            <div className={`row`}>
                                <span className={`${styles.customer} text-center`}>{item.name}</span>
                            </div>
                        </div>
                    </div>
                );
            }) }
        </Carousel>
    )
}