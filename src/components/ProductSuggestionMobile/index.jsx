import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import styles from './styles.module.css';
import CardProductMobile from '../CardProductMobile';

export default function ProductSuggestionMobile({ title, description, products }) {

    return (
        <div className={`d-md-none pb-5`}>
            <div className={`row`}>
                <span className={`${styles.title} text-center h2 mb-4 spectral`}>{title}</span>
            </div>
            <div className={`row`}>
                <span className={`${styles.description} text-center h5 mb-5 spectral-italic`}>{description}</span>
            </div>
            <div className={`pb-5 ${styles.Slide}`} >
                <Swiper tag="section"
                    id="slide-destaques"
                    // navigation
                    spaceBetween={5}
                    slidesPerView={1}
                    loop
                    centeredSlides={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: true,
                    }}
                    modules={[Autoplay, Navigation]}
                >
                    {
                        (products && products.length > 0)
                            ? products.map((product, index) => {
                                return (
                                    <SwiperSlide key={`slide-c-${index}`} className={`d-flex justify-content-center`}>
                                        <CardProductMobile product={product} />
                                    </SwiperSlide>
                                )
                            })
                            : <div className="col-md-12 text-center">Carregando produtos...</div>
                    }   
                </Swiper>
            </div>
        </div>
    )
}