import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './styles.module.css';
import CardProduct from '../CardProduct';

export default function ProductSuggestionDesktop({ title, description, products }) {

    return (
        <div className={`d-none d-md-block container `}>
            <div className={`row`}>
                <h1 className={`${styles.title} text-center h2 mb-4 spectral`}>{title}</h1>
            </div>
            <div className={`row`}>
                <span className={`${styles.description} text-center h5 mb-5 spectral-italic`}>{description}</span>
            </div>
            <div className={`row d-flex justify-content-center pb-5`}>
                <Swiper tag="section"
                    id="slide-destaques"
                    pagination={{
                        dynamicBullets: true,
                        clickable: true,
                    }}
                    spaceBetween={0}
                    loop
                    breakpoints={{
                        600: {
                            slidesPerView: 2,
                        },
                        905: {
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 4,
                        },
                        1500: {
                            slidesPerView: 4,
                        },
                    }}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: true,
                    }}
                    modules={[Autoplay, Pagination]}
                >
                    {
                        (products && products.length > 0)
                            ? products.map((product, index) => {
                                return (
                                        <SwiperSlide key={`slide-b-${index}`}>
                                            <CardProduct product={product} />
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