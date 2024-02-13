import React, { useState } from 'react';
import CarouselDesktop from '../CarouselDesktop';
import CarouselMobile from '../CarouselMobile';

export default function Carousel({ banners }) {
    // https://via.placeholder.com/1500
    return (
        <>
            <CarouselDesktop banners={banners} />
            <CarouselMobile banners={banners} />
        </>
    )
}